import { Request, Response } from "express";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import signInController from "../../controller/authController";

jest.mock("../models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("signInController", () => {
  const mockRequest = ({
    body: {
      email: "john.doe@example.com",
      password: "password",
    },
  } as unknown) as Request;
  const mockResponse = (() => {
    let response: any = {};
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue(response);
    response.send = jest.fn().mockReturnValue(response);
    return response;
  })() as Response;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should successfully sign in and return a JWT token", async () => {
    const mockUserFindOne = jest.fn().mockResolvedValue({
      _id: "123456789",
      email: "john.doe@example.com",
      password: "hashedPassword",
    });
    (User as jest.Mock).mockImplementation(() => ({
      findOne: mockUserFindOne,
    }));
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("jwtToken");

    await signInController(mockRequest, mockResponse);

    expect(mockUserFindOne).toHaveBeenCalled();
    expect(bcrypt.compare).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Successfully Signed In",
      token: "jwtToken",
    });
  });

  it("should return a 400 error if the user does not exist", async () => {
    const mockUserFindOne = jest.fn().mockResolvedValue(null);
    (User as jest.Mock).mockImplementation(() => ({
      findOne: mockUserFindOne,
    }));

    await signInController(mockRequest, mockResponse);

    expect(mockUserFindOne).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "User does not exist",
    });
  });

  it("should return a 400 error if the password is invalid", async () => {
    const mockUserFindOne = jest.fn().mockResolvedValue({
      _id: "123456789",
      email: "john.doe@example.com",
      password: "hashedPassword",
    });
    (User as jest.Mock).mockImplementation(() => ({
      findOne: mockUserFindOne,
    }));
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await signInController(mockRequest, mockResponse);

    expect(mockUserFindOne).toHaveBeenCalled();
    expect(bcrypt.compare).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid Password!",
    });
  });

  it("should return a 400 error if there is a server error", async () => {
    const mockUserFindOne = jest.fn().mockRejectedValue(new Error("Server error"));
    (User as jest.Mock).mockImplementation(() => ({
      findOne: mockUserFindOne,
    }));

    await signInController(mockRequest, mockResponse);

    expect(mockUserFindOne).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ errors: new Error("Server error") });
  });
});
