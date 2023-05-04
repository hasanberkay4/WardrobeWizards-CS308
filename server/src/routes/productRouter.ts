import { Router } from "express";
import productController from "../controller/productController"

const productRouter = Router();

// all products
productRouter.get('/', productController.getProducts)

// product by id
productRouter.get('/id/:productid', productController.getProductsById);

// all products by category
productRouter.get('/categories/:slug', productController.getCategorySpecificProducts);

// search data
productRouter.get('/search', productController.searchProducts);

// handle delivery request
productRouter.post('/delivery', productController.getDelivery);

// show delivery specific invoice
productRouter.get('/delivery/invoice/:id', productController.getDeliveryInvoice);

// get all delivieries
productRouter.get('/delivery', productController.getAllDeliveries);

// get all delivieries by user id
productRouter.get('/delivery/:user_id', productController.getDeliveriesByUserId);

// handle ratings
productRouter.put('/id/:productid', productController.updateProductRating);


// yagiz - filter

// get products by category filter with query params
productRouter.get('/filter', productController.getProductsByCategoryFilter);

// get all categories for filter dropdown
productRouter.get('/categories', productController.getAllCategories);



export { productRouter }