import { Router } from "express";
import productController from "../controller/productController"

const router = Router();

router.get('/products', productController.getProducts)

export default router