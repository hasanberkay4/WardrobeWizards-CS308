const { isValidSignInForm } = require('./path/to/middleware');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

describe('isValidSignInForm', () => {
  it('should call next if the request body is valid', () => {
    const req = mockRequest({
      body: {
        email: 'john@example.com',
        password: 'password123'
      }
    });
    const res = mockResponse();
    const next = jest.fn();

    isValidSignInForm(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return a 400 error if the email is invalid', () => {
    const req = mockRequest({
      body: {
        email: 'invalid-email',
        password: 'password123'
      }
    });
    const res = mockResponse();
    const next = jest.fn();

    isValidSignInForm(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Invalid sign in form data.',
      error: expect.any(Zod.ZodError)
    }));
  });

  it('should return a 400 error if the password is too short', () => {
    const req = mockRequest({
      body: {
        email: 'john@example.com',
        password: '123'
      }
    });
    const res = mockResponse();
    const next = jest.fn();

    isValidSignInForm(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Invalid sign in form data.',
      error: expect.any(Zod.ZodError)
    }));
  });
});
