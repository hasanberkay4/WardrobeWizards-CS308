import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import imageController from "../../controller/imageController";

jest.mock("fs");

describe("imageController", () => {
  describe("getImages", () => {
    it("should return a list of image URLs", () => {
      // Arrange
      const imagesDirectory = "src/images";
      const images = ["src/images/cat.jpg", "src/images/dog.jpg", "src/images/bird.jpg"];
      const expectedImageURLs = ["/images/cat.jpg", "/images/dog.jpg", "/images/bird.jpg"];
      const getImagesRecursivelyMock = jest.spyOn(imageController, "getImagesRecursively");
      getImagesRecursivelyMock.mockReturnValue(images);

      const req = {} as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;

      // Act
      imageController.getImages(req, res);

      // Assert
      expect(getImagesRecursivelyMock).toHaveBeenCalledWith(imagesDirectory);
      expect(res.json).toHaveBeenCalledWith({ images: expectedImageURLs });
    });

    it("should return a server error if an exception is thrown", () => {
      // Arrange
      const imagesDirectory = "src/images";
      const error = new Error("File system error");
      const getImagesRecursivelyMock = jest.spyOn(imageController, "getImagesRecursively");
      getImagesRecursivelyMock.mockImplementation(() => {
        throw error;
      });

      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Act
      imageController.getImages(req, res);

      // Assert
      expect(getImagesRecursivelyMock).toHaveBeenCalledWith(imagesDirectory);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: "Server error" });
    });
  });

  describe("getImagesByCategory", () => {
    // Write your tests for getImagesByCategory here
  });

  describe("getImagesByName", () => {
    // Write your tests for getImagesByName here
  });

  describe("getImagesById", () => {
    // Write your tests for getImagesById here
  });
});
