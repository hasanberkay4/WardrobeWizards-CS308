import { Router } from "express";
import productController from "../controller/productController"

const router = Router();

router.get('/products', productController.getProducts)

// DEPRECATED????? router.get('/products/:category', productController.getProductsByCategory);

router.get('/products/id/:productid', productController.getProductsById);

router.get('/categories/:slug', productController.getCategorySpecificProducts);

router.get('/search', productController.searchProducts);

router.get('/delivery', productController.getDelivery);

// In your backend routes file
router.put('/products/id/:productid', productController.updateProductRating);


export default router