import { Request, Response } from 'express';
import UserController from '../../controller/userContoller';
import User from '../../models/user';
import bcrypt from 'bcrypt';

jest.mock('../models/user');
jest.mock('bcrypt');

const mockRequest = (params: any, body: any): Request => {
  return {
    params,
    body,
  } as Request;
};

const mockResponse = (): Response => {
  const res: any = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const user = {
        _id: '1',
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        address: '123 Main St',
      };

      (User.findById as jest.Mock).mockResolvedValue(user);

      const req = mockRequest({ id: '1' }, {});
      const res = mockResponse();

      await UserController.getUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should return a 404 error if user not found', async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      const req = mockRequest({ id: '1' }, {});
      const res = mockResponse();

      await UserController.getUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ status: 'user doesnt exist' });
    });
  });

  describe('updateUserById', () => {
    it('should update a user and return updated fields', async () => {
      const user = new User({
        _id: '1',
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        address: '123 Main St',
      });

      const updatedData = {
        name: 'John',
        surname: 'Smith',
        email: 'john.smith@example.com',
        password: 'new_password',
        address: '456 Elm St',
      };

      (User.findById as jest.Mock).mockResolvedValue(user);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_new_password');

      const req = mockRequest({ id: '1' }, updatedData);
      const res = mockResponse();

      await UserController.updateUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(bcrypt.hash).toHaveBeenCalledWith(updatedData.password, 10);

      expect(res.json).toHaveBeenCalledWith({
        name: updatedData.name,
        surname: updatedData.surname,
        email: updatedData.email,
        address: updatedData.address,
      });
    });

    it('should return a 404 error if user not found', async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      const req = mockRequest({ id: '1' }, {});
      const res = mockResponse();

      await UserController.updateUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ status: 'user doesnt exist' });
    });
  });
});
