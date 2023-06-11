import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import Category from "../models/category";
import Discount from "../models/discount";
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
    const discount = await Discount.findOne({ productId: productid });
    if (product && discount) {
      product.discountRate = discount.discountRate;
      await product.updateOne(product)
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Server error" });
  }
};

// all products by category [DOESNT WORK]
const getCategorySpecificProducts = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  try {
    const category = await Category.findOne({ slug: slug });
    if (!category) {
      return res.status(404).send("Category not found");
    }

    const products = await Product.find({ category_ids: category._id });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Server error" });
  }
};

// search data
const searchProducts = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ message: "Missing query parameter" });
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

  let newDelivery;
  console.log("delivery", delivery);
  if (itemsOutOfStock.length === 0) {
    newDelivery = await Delivery.create(req.body.delivery);

    for (const product of newDelivery.products) {
      await Product.updateOne(
        { _id: product.productId },
        { $inc: { stock_quantity: -product.quantity } }
      );
    }

    sendInvoiceEmail(newDelivery);
    res.status(200).json(newDelivery._id);
  } else {
    const itemNamesOutOfStock = itemsOutOfStock.join(", ");
    res
      .status(300)
      .send(`The following products are not available: ${itemNamesOutOfStock}`);
  }
};

// show delivery specific invoice
const getDeliveryInvoice = async (req: Request, res: Response) => {
  const delivery = await Delivery.findById(req.params.id);
  if (!delivery || !delivery.pdf || !delivery.pdf.data) {
    res.status(404).send("Invoice not found");
    return;
  }
  res.set("Content-Type", "application/pdf");
  res.send(delivery.pdf.data);
};

// handle ratings
const updateProductInDatabase = async (
  productId: string,
  newAverageRating: number,
  newVoters: number
) => {
  await Product.findByIdAndUpdate(productId, {
    rating: newAverageRating,
    number_of_voters: newVoters,
  });
};

// handle ratings
const updateProductRating = async (req: Request, res: Response) => {
  const productId = req.params.productid;
  const newAverageRating = req.body.newAverageRating;
  const newVoters = req.body.newVoters;

  try {
    // Update the product with the new rating and number of voters
    await updateProductInDatabase(productId, newAverageRating, newVoters);

    res.status(200).json({ message: "Product rating updated successfully" });
  } catch (error) {
    console.error("Error updating product rating:", error);
    res.status(500).json({ message: "Error updating product rating" });
  }
};

// get all deliveries
const getAllDeliveries = async (req: Request, res: Response) => {
  try {
    const deliveries = await Delivery.find({}, { pdf: 0 }).sort({ date: -1 });
    res.json(deliveries);
    //res.status(200).json({status: "Successfully fetched products"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Server error" });
  }
};

// get deliveries by user id
const getDeliveriesByUserId = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const deliveries = await Delivery.find({ customerId: user_id }, { pdf: 0 }).sort({
      date: -1,
    });

    res.json(deliveries);
    //res.status(200).json({status: "Successfully fetched products"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Server error" });
  }
};

// yagiz - filter

// get products by category filter with query params
const getProductsByCategoryFilter = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const categoryObj = await Category.findOne({ slug: category });

    if (!categoryObj) {
      return res.status(404).json({ message: "Category not found" });
    }

    const filteredProducts = await Product.find({ category_ids: categoryObj.slug });

    res.json(filteredProducts);
  } catch (error) {
    res.status(404).json({ message: "Products not found for given filter" });
  }
};

// get all categories for filter dropdown
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(404).json({ message: "Categories not found" });
  }
};

// get category ids by slug
const getCategoryIdsBySlug = async (req: Request, res: Response) => {
  try {
    const slugs = req.body.category_slugs as string[];

    let category_ids = [] as { slug: string; id: string }[];

    // find id of each category slug
    slugs.forEach(async (slug) => {
      const category = await Category.findOne({ slug: slug });
      if (category) {
        category_ids.push({ slug: slug, id: category._id.toString() });
      } else {
        category_ids.push({ slug: slug, id: "" });
      }
    });

    res.status(200).json(category_ids);

  } catch (error) {
    res.status(404).json({ message: "Category not found" });
  }

}

// update Delivery Status
const updateDeliveryStatus = async (req: Request, res: Response) => {
  const newStatus = req.body.status;
  const deliveryId = req.body.deliveryId;
  const oldStatus = req.body.oldStatus;

  try {
    // Update the delivery with new status
    if (newStatus === "cancelled") {

      if (oldStatus === "processing") {

        await Delivery.findByIdAndUpdate(deliveryId, {
          status: newStatus,
          totalPrice: 0,

        });

      } else {
        throw new Error("To cancel delivery, its status must be processing");
      }



    } else {
      await Delivery.findByIdAndUpdate(deliveryId, {
        status: newStatus,
      });

    }

    res.status(200).json({ message: "Delivery status updated successfully" });
  } catch (error) {
    console.error("Error updating delivery status:", error);
    res.status(500).json({ message: "Error updating delivery status" });
  }
};

// update Delivery Status
const updateDeliveryProductStatus = async (req: Request, res: Response) => {




  const newStatus = req.body.status;
  const productId = req.body.prodId;
  const deliveryId = req.body.deliveryId;


  try {
    // Find the delivery by ID
    const delivery = await Delivery.findById(deliveryId);

    if (!delivery) {
      return;
    }

    // Find the product in the delivery's products array by its ID
    const productToUpdate = delivery.products.find(
      (product) => product.productId.toString() === productId
    );

    if (!productToUpdate) {
      // Product not found in the delivery
      console.log('Product not found in the delivery');
      return;
    }

    if (newStatus === "refunded") {
      const decrementedPrices = productToUpdate.price * productToUpdate.quantity
      let updatedPrice = delivery.totalPrice - decrementedPrices
      updatedPrice = updatedPrice < 0 ? 0 : updatedPrice;
      delivery.totalPrice = updatedPrice;


    }


    // Update the product's status
    productToUpdate.status = newStatus;

    // Save the updated delivery
    const updatedDelivery = await delivery.save();

    // Updated delivery with the product's status updated
    console.log('Product status updated:', updatedDelivery);
    res.status(200).json({ message: "Delivery product status successfully", updatedDelivery: updatedDelivery });
  } catch (err) {
    // Handle the error
    console.error(err);

    res.status(500).json({ message: "Error updating delivery product status" });
  }


};

// update Product Stock
const updateProductStock = async (req: Request, res: Response) => {
  const changeValue = req.body.stock;
  const productId = req.body.prodId;
  const isIncrease = req.body.isIncrease;

  console.log(typeof changeValue); // will log the type of changeValue
  console.log(typeof productId); // will log the type of productId
  console.log(typeof isIncrease); // will log the type of isIncrease

  try {
    // Find the product first
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Calculate the new stock count
    let newStockCount = isIncrease
      ? product.stock_quantity + changeValue
      : product.stock_quantity - changeValue;

    // Ensure it's not less than zero
    if (newStockCount < 0) {
      newStockCount = 0;
    }

    // Update the product
    product.stock_quantity = newStockCount;
    const updatedProduct = await product.save();

    if (!updatedProduct) {
      throw new Error("UpdatedProduct not found");
    }

    // Log and return the updated product
    console.log("Updated product: ", updatedProduct);


    res.status(200).json({ message: "Product stock updated successfully", updatedProduct: updatedProduct });
  } catch (error) {
    console.error("Error updating product stock:", error);
    res.status(500).json({ message: "Error updating product stock" });
  }

};


const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: "Categories not found" });
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
  getAllCategories, getCategoryIdsBySlug,
  updateDeliveryStatus,
  updateDeliveryProductStatus,
  updateProductStock,
  getCategories,
};
