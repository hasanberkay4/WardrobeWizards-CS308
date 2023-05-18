import { Request, Response, NextFunction } from 'express';
import * as zod from 'zod';
import { isValidUserToken } from '..middleware/userMiddleware';

describe('isValidUserToken middleware', () => {
  let req: Request, res: Response, next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = jest.fn();
  });

  it('should call the next middleware if the token and email are provided', () => {
    req.body = {
      token: 'valid-token',
      email: 'test@example.com'
    };

    isValidUserToken(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should send an error message if the token is missing', () => {
    req.body = {
      email: 'test@example.com'
    };

    isValidUserToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Invalid user token data.',
      error: new zod.ZodError([{
        code: 'invalid_type',
        message: 'Expected string, but received undefined'
      }])
    });
  });

  it('should send an error message if the email is missing', () => {
    req.body = {
      token: 'valid-token'
    };

    isValidUserToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Invalid user token data.',
      error: new zod.ZodError([{
        code: 'invalid_type',
        message: 'Expected string, but received undefined'
      }])
    });
  });

  it('should send an error message if the token is invalid', () => {
    req.body = {
      token: '',
      email: 'test@example.com'
    };

    isValidUserToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Invalid user token data.',
      error: new zod.ZodError([{
        code: 'invalid_string',
        message: 'String cannot be empty'
      }])
    });
  });

  it('should send an error message if the email is invalid', () => {
    req.body = {
      token: 'valid-token',
      email: 'invalid-email'
    };

    isValidUserToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Invalid user token data.',
      error: new zod.ZodError([{
        code: 'invalid_email',
        message: 'Invalid email format'
      }])
    });
  });
});
