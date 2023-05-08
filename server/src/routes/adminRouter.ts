
import { Router } from "express";
import { isValidAdminSignInForm, isValidAdminSignUpForm } from "../middleware/adminMiddleware";
import adminController from "../controller/adminController";

const adminRouter = Router();

// get admin user by id
adminRouter.post('/login', [isValidAdminSignInForm], adminController.adminSignInController);
adminRouter.post('/register', [isValidAdminSignUpForm], adminController.adminSignUpController);

export { adminRouter }