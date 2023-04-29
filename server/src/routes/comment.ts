import { Router } from "express";
import commentController from "../controller/commentController"

const router = Router();

router.get('/comments/:commentid', commentController.getCommentsByProductId)



export default router