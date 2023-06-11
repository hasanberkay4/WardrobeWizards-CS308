import { Router } from "express";
import userController from "../controller/userContoller"

const userRouter = Router();

// get user by id
userRouter.get('/user/:id', userController.getUserById);

// update user info by id
userRouter.put('/user/:id', userController.updateUserById);

// add amount to user wallet by id
userRouter.post('/user/:id/wallet', userController.addToWallet);



export { userRouter }