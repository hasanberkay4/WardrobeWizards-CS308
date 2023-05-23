// authRouter.test.js
import { authRouter } from '..routes/authRouter';
import { isValidSignInForm, isValidSignUpForm } from '../middleware/authMiddleware';
import authController from '../controller/authController';

jest.mock('../middleware/authMiddleware');
jest.mock('../controller/authController');

describe('authRouter', () => {
  test('has a route for signIn', () => {
    expect(authRouter.stack).toHaveLength(1);
    expect(authRouter.stack[0].route.path).toBe('/signIn');
    expect(authRouter.stack[0].route.stack).toHaveLength(1);
    expect(authRouter.stack[0].route.stack[0].method).toBe('post');
    expect(authRouter.stack[0].route.stack[0].name).toBe('signInController');
    expect(isValidSignInForm).toHaveBeenCalledTimes(1);
    expect(isValidSignUpForm).not.toHaveBeenCalled();
    expect(authController.signInController).toHaveBeenCalledTimes(1);
  });

  test('has a route for signUp', () => {
    expect(authRouter.stack).toHaveLength(2);
    expect(authRouter.stack[1].route.path).toBe('/signUp');
    expect(authRouter.stack[1].route.stack).toHaveLength(1);
    expect(authRouter.stack[1].route.stack[0].method).toBe('post');
    expect(authRouter.stack[1].route.stack[0].name).toBe('signUpController');
    expect(isValidSignInForm).toHaveBeenCalledTimes(1);
    expect(isValidSignUpForm).toHaveBeenCalledTimes(1);
    expect(authController.signUpController).toHaveBeenCalledTimes(1);
  });
});
