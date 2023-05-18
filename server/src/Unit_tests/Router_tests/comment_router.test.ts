import { commentRouter } from '../routes/commentRouter';
import commentController from '../controller/commentController';

jest.mock('../controller/commentController');

describe('commentRouter', () => {
  test('has a route for getting comments by productId', () => {
    expect(commentRouter.stack).toHaveLength(1);
    expect(commentRouter.stack[0].route.path).toBe('/productId/:productid');
    expect(commentRouter.stack[0].route.stack).toHaveLength(1);
    expect(commentRouter.stack[0].route.stack[0].method).toBe('get');
    expect(commentRouter.stack[0].route.stack[0].name).toBe('getCommentsByProductId');
    expect(commentController.getCommentsByProductId).toHaveBeenCalledTimes(1);
  });

  test('has a route for adding a comment', () => {
    expect(commentRouter.stack).toHaveLength(2);
    expect(commentRouter.stack[1].route.path).toBe('/add');
    expect(commentRouter.stack[1].route.stack).toHaveLength(1);
    expect(commentRouter.stack[1].route.stack[0].method).toBe('post');
    expect(commentRouter.stack[1].route.stack[0].name).toBe('addComment');
    expect(commentController.addComment).toHaveBeenCalledTimes(1);
  });

  test('has a route for getting comments by productId and customerId', () => {
    expect(commentRouter.stack).toHaveLength(3);
    expect(commentRouter.stack[2].route.path).toBe('/productId/:productid/:customerid');
    expect(commentRouter.stack[2].route.stack).toHaveLength(1);
    expect(commentRouter.stack[2].route.stack[0].method).toBe('get');
    expect(commentRouter.stack[2].route.stack[0].name).toBe('getCommentsByProductandUserId');
    expect(commentController.getCommentsByProductandUserId).toHaveBeenCalledTimes(1);
  });
});
