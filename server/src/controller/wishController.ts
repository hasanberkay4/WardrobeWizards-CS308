import { Request, Response, NextFunction } from "express"
import Wish from "../models/wish";
import Product from "../models/product";
import Notification from "../models/notification";

// fetch user-specific wishes
const getUserWishes = async (req: Request, res: Response) => {
  try {
    const userid = req.params.userid;
    
    const userWishes = await Wish.find({ customer: userid });

    const productIds = userWishes.map((wish) => wish.product);

    const products = await Product.find({ _id: { $in: productIds } });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
};

// fetch user-specific wishes
const checkUserWish = async (req: Request, res: Response) => {
  try {
    const { product, customer } = req.body;

    const existingWish = await Wish.findOne({ product, customer });

    if (existingWish) {
      
      res.status(200).json({ status: 'Product already in wishlist' });
    } else {
      // Product does not exist in the user's wishlist
      res.status(200).json({ status: 'Product not in wishlist' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
};

// add wish
const addWish = async (req: Request, res: Response) => {
    try {
      const { product, customer } = req.body;
  
      const newWish = new Wish({
        product,
        customer,
      });
  
      await newWish.save();
  
      res.status(200).json({ status: "Wish added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Server error" });
    }
};

// remove wish
const removeWish = async (req: Request, res: Response) => {
  try {
    const { product, customer } = req.body;

    const existingWish = await Wish.findOneAndDelete({ product, customer });

    if (existingWish) {
      // Delete the corresponding notification object
      await Notification.findOneAndDelete({ product, customer });

      res.status(200).json({ status: 'Wish and notification removed successfully' });
    } else {
      res.status(404).json({ status: 'Wish not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
};

export default { getUserWishes, checkUserWish, addWish, removeWish }