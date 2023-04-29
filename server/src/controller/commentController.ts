import { Request, Response, NextFunction } from "express"
import Comment from "../models/comment"


const getCommentsByProductId = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Server error" });
  }
};


export default { getCommentsByProductId }