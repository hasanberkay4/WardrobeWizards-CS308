import { Router } from "express";
import { isValidUserToken } from "../middleware/userMiddleware";
import userController from "../controller/userContoller"

const userRouter = Router();

// get user by id
userRouter.get('/user', [isValidUserToken], userController.getUserById);


export { userRouter }