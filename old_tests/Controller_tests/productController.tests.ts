import { Request, Response, NextFunction } from "express"
import Product from ".../models/product"
import Category from '.../models/category';
import Delivery, { IDelivery } from "../models/order";
import { sendInvoiceEmail } from "../middleware/pdfGenerator";

// all products
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

// product by id
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

// all products by category [DOESNT WORK]
const getCategorySpecificProducts = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  console.log("slug:", slug);

  try {
    const category = await Category.findOne({ slug: slug });
    if (!category) {
      return res.status(404).send('Category not found');
    }
    console.log("category:", category);

    const products = await Product.find({ category_ids: category._id });
    

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
};


// search data
const searchProducts = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ message: 'Missing query parameter' });
  }
  const searchResult = await Product.search(query);
  res.json(searchResult);
};

// handle delivery request
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

// show delivery specific invoice
const getDeliveryInvoice = async (req: Request, res: Response) => {

  const delivery = await Delivery.findById(req.params.id);
  if (!delivery || !delivery.pdf || !delivery.pdf.data) {
    res.status(404).send('Invoice not found');
    return;
  }
  res.set('Content-Type', 'application/pdf');
  res.send(delivery.pdf.data);
};

// handle ratings
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
  
  // get all deliveries
  const getAllDeliveries = async (req: Request, res: Response) => {
    try {
      const deliveries = await Delivery.find();
      res.json(deliveries);
      //res.status(200).json({status: "Successfully fetched products"})
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Server error" });
    }
  }
  
  // get deliveries by user id
  const getDeliveriesByUserId = async (req: Request, res: Response) => {
    try {
      const user_id = req.params.user_id;
      const deliveries = await Delivery.find({ customerId: user_id });
      res.json(deliveries);
      //res.status(200).json({status: "Successfully fetched products"})
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Server error" });
    }
  }
  
  // yagiz - filter
  
  // get products by category filter with query params
  const getProductsByCategoryFilter = async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      const categoryObj = await Category.findOne({ slug: category });
      // console.log("category filter:", categoryObj)
  
      const filteredProducts = await Product.find({ category_ids: categoryObj });
      // console.log("filtered products:", filteredProducts);
  
      res.json(filteredProducts);
    } catch (error) {
      res.status(404).json({ message: 'Products not found for given filter' });
    }
  }
  
  // get all categories for filter dropdown
  const getAllCategories = async (req: Request, res: Response) => {
    try {
      const categories = await Category.find();
      res.json(categories);
  
    } catch (error) {
      res.status(404).json({ message: 'Categories not found' });
    }
  }
  
  export default {
    getProducts,
    getProductsById,
    getCategorySpecificProducts,
    searchProducts,
    updateProductRating,
    getDelivery,
    getDeliveryInvoice,
    getAllDeliveries,
    getDeliveriesByUserId,
    getProductsByCategoryFilter,
    getAllCategories
  };
  