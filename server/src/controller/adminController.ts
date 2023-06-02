import { Request, Response } from "express"
import Admin from "../models/admin"
import Product from "../models/product";
import Deliveries from "../models/order";
import Discount from '../models/discount';
import Wish from "../models/wish";
import Notification from "../models/notification";
import Category from "../models/category";
import Comments from "../models/comment";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { addProductSchema } from "../middleware/adminMiddleware/productMiddleware";



const adminSignInController = async (req: Request, res: Response) => {
    try {
        // Get user input
        const username = req.body.username as string;
        const password = req.body.password as string;
        const title = req.body.title as string;

        // Validate if admin exist in our database
        const admin = await Admin.findOne({ username: username });
        if (!admin) {
            return res.send(400).json({ message: "Admin does not exist" })
        }

        // Validate password is admin password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Password!" });
        }

        // Validate title is admin title
        const isTitleValid = title == admin.title;
        if (!isTitleValid) {
            return res.status(400).json({ message: "Invalid Title!" });
        }

        // Create token
        const token = jwt.sign(
            { admin_id: admin._id, username, title },
            process.env.TOKEN_KEY!,
            { expiresIn: "2h" }
        );

        // return success response and JWT token
        return res.status(200).json({ status: "success", token: token });
    }

    // if user not found or password not match
    catch (err) {
        return res.status(400).json({ errors: err });
    }
}

const adminSignUpController = async (req: Request, res: Response) => {
    try {

        // Get admin input
        const username = req.body.username as string;
        const password = req.body.password as string;
        const title = req.body.title as string;

        // check if admin already exist
        const admin = await Admin.findOne({ username: username });
        if (admin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newAdmin = new Admin({
            username: username,
            password: hashedPassword,
            title: title,
        });

        // save user to database
        const addedAdmin = await newAdmin.save()

        // return new user info
        res.status(200).json({ status: "success", adminInfo: addedAdmin })
    }
    // if error
    catch (err) {
        return res.status(400).json({ errors: err });
    }
}


// admin products
const adminGetProductsController = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json({ status: "success", products: products })
    }
    catch (err) {
        return res.status(400).json({ errors: err });
    }
}

const adminGetProductController = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({ status: "success", product: product })
    }
    catch (err) {
        return res.status(400).json({ errors: err });
    }
}

const adminCreateProductController = async (req: Request, res: Response) => {
    try {
        // get body data
        console.log("Received request to add product");
        console.log("Request body:", req.body);

        const productFormData = addProductSchema.parse(req.body);

        const product = new Product({
            name: productFormData.name,
            description: productFormData.description,
            category_ids: productFormData.category_slugs,
            initial_price: productFormData.initial_price,
            stock_quantity: productFormData.stock_quantity,
            warrant_status: productFormData.warranty_status,
            expense: productFormData.expense,
            image: "http://localhost:5001/images/" + productFormData.image,
            delivery_info: "",
            discountRate: 0,
            number_of_voters: 0,
            popularity: 0,
            rating: 0,
        });

        const addedProduct = await product.save();
        return res.status(200).json({ status: "success", product: addedProduct });
    } catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
};

const adminCreateCategoryController = async (req: Request, res: Response) => {
    try {
        const category = new Category({
            name: req.body.name,
            slug: req.body.slug,
        });
        const addedCategory = await category.save();
        return res.status(200).json({ status: "success", category: addedCategory });
    } catch (err) {
        return res.status(400).json({ errors: err });
    }
};

const adminUpdateProductController = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            const new_stock_quantity = parseInt(req.body.stock_quantity);
            product.stock_quantity = new_stock_quantity;
            const updatedProduct = await product.updateOne(product)
            res.status(200).json({ status: "success", product: product })
        } else {
            return res.status(400).json({ message: "Product not found" });
        }
    } catch (err) {
        console.log("ahoy error");
        return res.status(400).json({ errors: err });
    }
}

const adminDeleteProductController = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.status(200).json({ status: "success", message: "Product deleted" })
        }
        else {
            return res.status(400).json({ message: "Product not found" });
        }
    }
    catch (err) {
        return res.status(400).json({ errors: err });
    }
}

const adminUpdateProductPriceController = async (req: Request, res: Response) => {
    try {
        console.log("Received request to update product price");
        console.log("Request body:", req.body);
        const product = await Product.findById(req.params.id);
        if (product) {
            console.log("updated price:", req.body);
            const newPrice = parseInt(req.body.newPrice);
            product.initial_price = newPrice;
            const updatedProduct = await product.updateOne(product)
            console.log("new price:", product.initial_price);
            res.status(200).json({ status: "success", product: updatedProduct })
        }
        else {
            return res.status(400).json({ message: "Product not found" });
        }
    }
    catch (err) {
        return res.status(400).json({ errors: err });
    }
}

const adminProductDiscountController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;

        const productName = (await Product.findById(productId))?.name;

        const discountRate = parseInt(req.body.discountPercentage);

        let discountUpdate = 0;

        if (discountRate === 0) {
            // If the discount rate is 0, remove the discount from the database
            await Product.updateOne({ _id: productId }, { $set: { discountRate: 0 } });
            await Discount.deleteOne({ productId: productId });
            console.log("Discount removed");
            return res.status(200).json({ status: "success", discount: null });
        }

        let content;

        let discount = await Discount.findOne({ productId: productId });
        if (discount) {
            // If a discount already exists, update it
            discount.discountRate = discountRate;
            discount.date = new Date(); // Update the date to the current date

            content = `The discount on the product "${productName}" in your wishlist has been updated.`
        } else {
            // If no discount exists, create a new one
            discount = new Discount({ productId, discountRate });
            await Product.updateOne({ _id: productId }, { $set: { discountRate: discountRate } });

            content = `The price of the product "${productName}" in your wishlist has been discounted.`
        }

        console.log("Discount:", discount);
        await discount.save(); // Save the discount (either updated or new)

        console.log("Updated/created discount:", discount);
        res.status(200).json({ status: "success", discount });

        const wishes = await Wish.find({ product: req.params.id }).select('customer');

        for (const wish of wishes) {
            const notification = new Notification({
                customer: wish.customer,
                content: content,
                createdAt: Date.now(),
                product: productId
            });

            try {
                await notification.save();
            } catch (err) {
                console.log(err);
                return;
            }
        }

    } catch (err) {
        console.error(err);
        return res.status(400).json({ errors: err });
    }
};

const adminRemoveDiscountController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;

        await Product.updateOne({ _id: productId }, { $set: { discountRate: 0 } });
        await Discount.deleteOne({ productId: productId });

        await Notification.deleteMany({ product: productId });
        console.log("Notifications deleted");

        return res.status(200).json({ status: "success", discount: null });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ errors: err });
    }
};

// admin deliveries
const adminGetDeliveriesController = async (req: Request, res: Response) => {
    try {
        const deliveries = await Deliveries.find();
        res.status(200).json({ status: "success", deliveries: deliveries })
    }
    catch (err) {
        return res.status(400).json({ errors: err });
    }
}

const adminGetDeliveryController = async (req: Request, res: Response) => {
    try {
        const delivery = await Deliveries.findById(req.params.id);
        res.status(200).json({ status: "success", delivery: delivery })
    }
    catch (err) {
        return res.status(400).json({ errors: err });
    }
}

const adminGetDeliveryByUserIdController = async (req: Request, res: Response) => {
    try {
        const delivery = await Deliveries.find({ customerId: req.params.user_id });
        res.status(200).json({ status: "success", delivery: delivery })
    }
    catch (err) {
        return res.status(400).json({ errors: err });
    }
}

const adminUpdateDeliveryController = async (req: Request, res: Response) => {
    try {
        const delivery = await Deliveries.findById(req.params.id);
        if (delivery) {
            delivery.status = req.body.status;
            const updatedDelivery = await delivery.save();
            res.status(200).json({ status: "success", delivery: updatedDelivery })
        }
    }
    catch (err) {
        return res.status(400).json({ errors: err });
    }
}


// admin comments
const adminGetCommentsController = async (req: Request, res: Response) => {
    try {
        const comments = await Comments.find();
        res.status(200).json({ status: "success", comments: comments })
    }
    catch (err) {
        res.status(400).json({ errors: err });
    }
}

const adminGetCommentController = async (req: Request, res: Response) => {
    try {
        const comment = await Comments.findById(req.params.id);
        res.status(200).json({ status: "success", comment: comment })
    }
    catch (err) {
        res.status(400).json({ errors: err });
    }
}

const adminUpdateCommentController = async (req: Request, res: Response) => {
    try {
        const comment = await Comments.findById(req.params.id);
        if (comment) {
            if (comment.approved == true) {
                comment.approved = false;
            }
            else {
                comment.approved = true;
            }
            const updatedComment = await comment.save();
            res.status(200).json({ status: "success", comment: updatedComment })
        }
    }
    catch (err) {
        res.status(400).json({ errors: err });
    }
}


export default {
    adminSignInController, adminSignUpController,
    adminGetProductsController, adminGetProductController, adminCreateProductController, adminUpdateProductController, adminDeleteProductController,
    adminGetDeliveriesController, adminGetDeliveryController, adminGetDeliveryByUserIdController, adminUpdateDeliveryController,
    adminGetCommentsController, adminGetCommentController, adminUpdateCommentController, adminUpdateProductPriceController, adminProductDiscountController, adminRemoveDiscountController,
    adminCreateCategoryController
}  