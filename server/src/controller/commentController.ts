import { Request, Response, NextFunction } from "express"
import Comment from "../models/comment"
import { validationResult } from 'express-validator';


// should return just approved comments
const getCommentsByProductId = async (req: Request, res: Response) => {
  try {
    const productid = req.params.productid;
    const isApproved = true
    const comments = await Comment.find({ productId: productid, approved: isApproved }).sort({ date: -1 }).populate('customerId', 'name surname');
    console.log(comments)
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Server error" });
  }
};


// should check if there is comment added by the same user before??
const addComment = async (req: Request, res: Response) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const isApproved = !req.body.description ? true : false;


    const newComment = new Comment({
      customerId: req.body.customerId,
      productId: req.body.productId,
      date: req.body.date,
      description: req.body.description,
      approved: isApproved,
      rating: req.body.rating
    })
    const addedComment = await newComment.save()
    res.status(200).json({ status: "success", userInfo: addedComment })
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Server error" });
  }
};


// should return just approved comments
const getCommentsByProductandUserId = async (req: Request, res: Response) => {
  try {
    const productid = req.params.productid;
    const userid = req.params.customerid;
    console.log(productid, "----", userid)
    const comments = await Comment.find({ productId: productid, customerId: userid }).sort({ date: -1 }).populate('customerId', 'name surname');
    console.log(comments)
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Server error" });
  }
};

export default { getCommentsByProductId, addComment, getCommentsByProductandUserId }