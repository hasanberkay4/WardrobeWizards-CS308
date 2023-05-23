import { userRouter } from '..routes/userRouter';
import userController from '../controller/userContoller';

jest.mock('../controller/userContoller');

describe('userRouter', () => {
  test('has a route for getting a user by id', () => {
    expect(userRouter.stack).toHaveLength(1);
    expect(userRouter.stack[0].route.path).toBe('/user/:id');
    expect(userRouter.stack[0].route.stack).toHaveLength(1);
    expect(userRouter.stack[0].route.stack[0].method).toBe('get');
    expect(userRouter.stack[0].route.stack[0].name).toBe('getUserById');
    expect(userController.getUserById).toHaveBeenCalledTimes(1);
  });

  test('has a route for updating user info by id', () => {
    expect(userRouter.stack).toHaveLength(2);
    expect(userRouter.stack[1].route.path).toBe('/user/:id');
    expect(userRouter.stack[1].route.stack).toHaveLength(1);
    expect(userRouter.stack[1].route.stack[0].method).toBe('put');
    expect(userRouter.stack[1].route.stack[0].name).toBe('updateUserById');
    expect(userController.updateUserById).toHaveBeenCalledTimes(1);
  });
});
