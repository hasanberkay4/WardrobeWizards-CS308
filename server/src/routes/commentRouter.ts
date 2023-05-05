import { Router } from "express";
import commentController from "../controller/commentController"

const commentRouter = Router();

commentRouter.get('/productId/:productid', commentController.getCommentsByProductId)
commentRouter.post('/add', commentController.addComment)
commentRouter.get("/productId/:productid/:customerid", commentController.getCommentsByProductandUserId)
commentRouter.post("/update", commentController.updateComment)



export { commentRouter }