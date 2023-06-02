
import { Router } from "express";
import adminController from "../controller/adminController";

// middleware
import { isValidAdminSignInForm, isValidAdminSignUpForm } from "../middleware/adminMiddleware";

const adminRouter = Router();

// admin auth
adminRouter.post('/login', [isValidAdminSignInForm], adminController.adminSignInController);
adminRouter.post('/register', [isValidAdminSignUpForm], adminController.adminSignUpController);

// admin products
adminRouter.post('/products', adminController.adminCreateProductController);
adminRouter.post('/products/add-category', adminController.adminCreateCategoryController);
adminRouter.get('/products', adminController.adminGetProductsController);
adminRouter.get('/products/:id', adminController.adminGetProductController);
adminRouter.put('/products/:id', adminController.adminUpdateProductController);
adminRouter.delete('/products/:id', adminController.adminDeleteProductController);

// sales manager products
adminRouter.put('/sales-manager/products/:id', adminController.adminUpdateProductPriceController);
adminRouter.put('/sales-manager/products/:id/discount', adminController.adminProductDiscountController);
adminRouter.put('/sales-manager/remove-discount/:id', adminController.adminRemoveDiscountController);

// admin deliveries
adminRouter.get('/deliveries', adminController.adminGetDeliveriesController);
adminRouter.get('/deliveries/:id', adminController.adminGetDeliveryController);
adminRouter.get('/deliveries/user_id', adminController.adminGetDeliveryByUserIdController);
adminRouter.put('/deliveries/:id', adminController.adminUpdateDeliveryController);

// admin comments
adminRouter.get('/comments', adminController.adminGetCommentsController);
adminRouter.get('/comments/:id', adminController.adminGetCommentController);
adminRouter.put('/comments/:id', adminController.adminUpdateCommentController);

export { adminRouter }