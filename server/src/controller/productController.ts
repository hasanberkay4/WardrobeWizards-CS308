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

const getProductsByCategory = async (req: Request, res: Response) => {
  const category = req.params.category;

  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
};

const getProductsById = async (req: Request, res: Response) => {
  const productid = req.params.productid;

  try {
    const product = await Product.findById(productid);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
};

export default {getProducts, getProductsByCategory, getProductsById}