import { Router } from "express";
import productController from "../controller/productController"

const router = Router();

router.get('/products', productController.getProducts)
router.get('/products/:category', productController.getProductsByCategory);
router.get('/products/id/:productid', productController.getProductsById);

export default router