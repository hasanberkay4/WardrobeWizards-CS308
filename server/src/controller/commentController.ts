import { Request, Response, NextFunction } from "express"
import Comment from "../models/comment"
import { validationResult } from 'express-validator';


// should return just approved comments
const getCommentsByProductId = async (req: Request, res: Response) => {
  try {
    const productid = req.params.productid;
    const isApproved = true
    const comments = await Comment.find({ productId: productid,     
       $or: [
      { approved: isApproved },
      { rating: { $ne: 0 } }
    ] }).sort({ date: -1 }).populate('customerId', 'name surname');
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



const updateComment = async (req: Request, res: Response) => {
  const productid = req.body.productId;
  const userid = req.body.customerId;
  const comment = req.body.description

  try {
    // Update the product with the new rating and number of voters
   const updatedComment =  await Comment.findOneAndUpdate({productId:productid, customerId: userid}, {
      description: comment,
      approved: false,
    },   { new: true });

    console.log( "prodid:",productid , "   userid:",userid)

    if (!updatedComment) {
      // Return an error if the comment was not found
      return res.status(404).json({ message: 'Comment not found' });
    }
    

    res.status(200).json({ message: 'Comment updated successfully'});
  } catch (error) {
    console.error('Error updating product rating:', error);
    res.status(500).json({ message: 'Error updating product rating' });
  }
};

export default { getCommentsByProductId, addComment, getCommentsByProductandUserId, updateComment }