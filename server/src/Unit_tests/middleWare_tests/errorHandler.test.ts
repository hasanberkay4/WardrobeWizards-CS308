import { Request, Response, NextFunction } from 'express';
import { isValidSignInForm, isValidSignUpForm } from '.../middleware/authMiddleware';
import * as zod from 'zod';

describe('isValidSignInForm middleware', () => {
  let req: Request, res: Response, next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    } as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as unknown as Response;

    next = jest.fn();
  });

  it('should call next if the form data is valid', () => {
    isValidSignInForm(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should send an error message if the email is invalid', () => {
    req.body.email = 'invalid-email';

    isValidSignInForm(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Invalid sign in form data.',
      error: new zod.ZodError([{
        code: 'invalid_email',
        message: 'Invalid email format'
      }])
    });
  });

  it('should send an error message if the password is too short', () => {
    req.body.password = 'shortpw';

    isValidSignInForm(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Invalid sign in form data.',
      error: new zod.ZodError([{
        code: 'too_small',
        minimum: 8,
        type: 'string',
        inclusive: true,
        message: 'Should be at least 8 characters long'
      }])
    });
  });
});

describe('isValidSignUpForm middleware', () => {
  let req: Request, res: Response, next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        name: 'John',
        surname: 'Doe',
        email: 'test@example.com',
        password: 'password123'
      }
    } as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as unknown as Response;

    next = jest.fn();
  });

  it('should call next if the form data is valid', () => {
    isValidSignUpForm(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should send an error message if the name is missing', () => {
    delete req.body.name;

    isValidSignUpForm(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Invalid sign up form data.',
      error: new zod.ZodError([{
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['name'],
        message: 'Required'
      }])
    });
  });

  it('should send an error message if the email is invalid', () => {
    req.body.email = 'invalid-email';

    isValidSignUpForm(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Invalid sign up form data.',
      error: new zod.ZodError([{
        code: 'invalid_email',
        message: 'Invalid email format'
      }])
    });
  });

 