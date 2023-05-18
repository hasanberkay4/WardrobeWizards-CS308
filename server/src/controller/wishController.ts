import { Request, Response, NextFunction } from "express"
import Wish from "../models/wish";

// all wishes
const getWishes = async (req: Request, res: Response) => {
  try {
    const wishes = await Wish.find();
    res.json(wishes);
    //res.status(200).json({status: "Successfully fetched products"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Server error" });
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

const removeWish = async (req: Request, res: Response) => {
    try {
      const { wishId } = req.params;

      await Wish.findByIdAndRemove(wishId);
  
      res.status(200).json({ status: "Wish removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Server error" });
    }
  };

export default { getWishes, addWish, removeWish }