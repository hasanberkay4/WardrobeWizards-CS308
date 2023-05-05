import { Request, Response } from 'express';
import CommentController from '../../controller/commentController';
import Comment from '../../models/comment';
import * as validationResultModule from 'express-validator';



jest.mock('../models/comment');
jest.mock('express-validator');

const mockRequest = (params: any, body: any): Request => {
  return {
    params,
    body,
  } as Request;
};

const mockResponse = (): Response => {
    const res: any = {};
    res.json = jest.fn().mockImplementation((value) => {
      res.value = value;
      return res;
    });
    res.status = jest.fn().mockImplementation((code) => {
      res.statusCode = code;
      return res;
    });
    return res as unknown as Response;
  };
  
describe('Comment Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCommentsByProductId', () => {
    it('should return approved comments for a given product ID', async () => {
      const comments = [
        { productId: '1', approved: true },
        { productId: '1', approved: true },
      ];

      (Comment.find as jest.Mock).mockResolvedValue(comments);

      const req = mockRequest({ productid: '1' }, {});
      const res = mockResponse();

      await CommentController.getCommentsByProductId(req, res);

      expect(Comment.find).toHaveBeenCalledWith({ productId: '1', approved: true });
      expect(res.json).toHaveBeenCalledWith(comments);
    });

    it('should return a 500 error if there is a server error', async () => {
      (Comment.find as jest.Mock).mockRejectedValue(new Error('Server error'));

      const req = mockRequest({ productid: '1' }, {});
      const res = mockResponse();

      await CommentController.getCommentsByProductId(req, res);

      expect(Comment.find).toHaveBeenCalledWith({ productId: '1', approved: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 'Server error' });
    });
  });

 
describe('addComment', () => {
    it('should add a comment and return success status', async () => {
      const commentData = {
        customerId: '1',
        productId: '1',
        date: '2023-05-01',
        description: 'Nice product',
        rating: 5,
      };
      const mockValidationResult = {
        isEmpty: () => true,
        array: () => [],
        mapped: () => ({}),
        formatWith: () => mockValidationResult,
        throw: () => {},
      };
      jest.spyOn(validationResultModule, 'validationResult').mockReturnValue(mockValidationResult as any);
  
      const newComment = new Comment(commentData);
      (Comment.prototype.save as jest.Mock).mockResolvedValue(newComment);
  
      const req = mockRequest({}, commentData);
      const res = mockResponse();
  
      await CommentController.addComment(req, res);
  
      expect(validationResultModule.validationResult).toHaveBeenCalledWith(req);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 'success', userInfo: newComment });
    });
  
    it('should return a 400 error if there are validation errors', async () => {
      const mockValidationResult = {
        isEmpty: () => false,
        array: () => [{ error: 'Invalid input' }],
        mapped: () => ({}),
        formatWith: () => mockValidationResult,
        throw: () => {},
      };
      jest.spyOn(validationResultModule, 'validationResult').mockReturnValue(mockValidationResult as any);
  
      const req = mockRequest({}, {});
      const res = mockResponse();
  
      await CommentController.addComment(req, res);
  
      expect(validationResultModule.validationResult).toHaveBeenCalledWith(req);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ errors: [{ error: 'Invalid input' }] });
    });
  
    it('should return a 500 error if there is a server error', async () => {
      const mockValidationResult = {
        isEmpty: () => true,
        array: () => [],
        mapped: () => ({}),
        formatWith: () => mockValidationResult,
        throw: () => {},
      };
      jest.spyOn(validationResultModule, 'validationResult').mockReturnValue(mockValidationResult as any);
  
      (Comment.prototype.save as jest.Mock).mockRejectedValue(new Error('Server error'));
  
      const req = mockRequest({}, {});
      const res = mockResponse();
  
      await CommentController.addComment(req, res);
  
      expect(validationResultModule.validationResult).toHaveBeenCalledWith(req);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 'Server error' });
    });
  });

  describe('getCommentsByProductandUserId', () => {
    it('should return comments for a given product ID and user ID', async () => {
      const comments = [
        { productId: '1', customerId: '1' },
        { productId: '1', customerId: '1' },
      ];

      (Comment.find as jest.Mock).mockResolvedValue(comments);

      const req = mockRequest({ productid: '1', customerid: '1' }, {});
      const res = mockResponse();

      await CommentController.getCommentsByProductandUserId(req, res);

      expect(Comment.find).toHaveBeenCalledWith({ productId: '1', customerId: '1' });
      expect(res.json).toHaveBeenCalledWith(comments);
    });

    it('should return a 500 error if there is a server error', async () => {
      (Comment.find as jest.Mock).mockRejectedValue(new Error('Server error'));

      const req = mockRequest({ productid: '1', customerid: '1' }, {});
      const res = mockResponse();

      await CommentController.getCommentsByProductandUserId(req, res);

      expect(Comment.find).toHaveBeenCalledWith({ productId: '1', customerId: '1' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 'Server error' });
    });
  });
});
