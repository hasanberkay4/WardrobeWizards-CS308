import { Router } from "express";
import { isValidSignInForm, isValidSignUpForm } from "../middleware/authMiddleware";
import authContoller from "../controller/authController"

const authRouter = Router();

// router format: router.method(url, middleware, controller)
authRouter.post("/signIn", [isValidSignInForm], authContoller.signInController);
authRouter.post("/signUp", [isValidSignUpForm], authContoller.signUpController);

export { authRouter }
