import { Request, Response, NextFunction } from "express"
import Product from "../models/product"
import Category from '../models/category';
import Delivery, { IDelivery } from "../models/order";
import { sendInvoiceEmail } from "../middleware/pdfGenerator";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
    //res.status(200).json({status: "Successfully fetched products"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Server error" });
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

const getCategorySpecificProducts = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  try {
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).send('Category not found');
    }
    const products = await Category.findProducts(category._id);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ message: 'Missing query parameter' });
  }
  const searchResult = await Product.search(query);
  res.json(searchResult);
};

const getDelivery = async (req: Request, res: Response) => {
  const delivery: IDelivery = req.body.delivery;

  const itemsOutOfStock = [];

  for (const product of delivery.products) {
    const dbProduct = await Product.findById(product.productId);
    if (!dbProduct || dbProduct.stock_quantity < product.quantity) {
      itemsOutOfStock.push(product.name);
    }
  }

  if (itemsOutOfStock.length === 0) {
    const delivery = await Delivery.create(req.body.delivery);

    for (const product of delivery.products) {
      await Product.updateOne(
        { _id: product.productId },
        { $inc: { stock_quantity: -product.quantity } }
      );
    }

    sendInvoiceEmail(delivery);
    res.status(200).send('Purchase can proceed.');
  }
  else {
    const itemNamesOutOfStock = itemsOutOfStock.join(', ');
    res.status(300).send(`The following products are not available: ${itemNamesOutOfStock}`);
  }
};

const getDeliveryInvoice = async (req: Request, res: Response) => {
  const delivery = await Delivery.findById(req.params.id);
  if (!delivery || !delivery.pdf || !delivery.pdf.data) {
    res.status(404).send('Invoice not found');
    return;
  }
  res.set('Content-Type', 'application/pdf');
  res.send(delivery.pdf.data);
};

const updateProductInDatabase = async (productId: string, newAverageRating: number, newVoters: number) => {
  await Product.findByIdAndUpdate(productId, {
    rating: newAverageRating,
    number_of_voters: newVoters,
  });
};

const updateProductRating = async (req: Request, res: Response) => {
  const productId = req.params.productid;
  const newAverageRating = req.body.newAverageRating;
  const newVoters = req.body.newVoters;

  try {
    // Update the product with the new rating and number of voters
    await updateProductInDatabase(productId, newAverageRating, newVoters);

    res.status(200).json({ message: 'Product rating updated successfully' });
  } catch (error) {
    console.error('Error updating product rating:', error);
    res.status(500).json({ message: 'Error updating product rating' });
  }
};

export default { getProducts, getProductsById, getCategorySpecificProducts, searchProducts, updateProductRating, getDelivery, getDeliveryInvoice }



// DEPRECATED????? export default { getProducts, getProductsByCategory, getProductsById, getCategorySpecificProducts, searchProducts}
/* DEPRECATED ??????
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
*/