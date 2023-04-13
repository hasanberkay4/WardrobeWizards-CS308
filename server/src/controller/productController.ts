import {Request, Response, NextFunction} from "express"
import Product from "../models/product"

//@desc Gets all products to list
//@route Get /
//@access public
const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
    //res.status(200).json({status: "Successfully fetched products"})
  } catch (error) {
    console.error(error);
    res.status(500).json({status: "Server error"});
  }
};

export default {getProducts}