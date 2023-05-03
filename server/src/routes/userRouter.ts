import { Router } from "express";
import { isValidUserToken } from "../middleware/userMiddleware";
import userController from "../controller/userContoller"

const userRouter = Router();

// get user by id
userRouter.get('/user/:id', userController.getUserById);

// update user info by id
userRouter.put('/user/:id', userController.updateUserById);

// [isValidUserToken]

export { userRouter }