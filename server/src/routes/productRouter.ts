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

// handle ratings
productRouter.put('/id/:productid', productController.updateProductRating);

export { productRouter }