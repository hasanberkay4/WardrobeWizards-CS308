import { Router } from "express";
import commentController from "../controller/commentController"
import { body, CustomValidator } from 'express-validator'

const router = Router();

router.get('/comments/productId/:productid', commentController.getCommentsByProductId)
router.post('/comments/add', commentController.addComment)



export default router