import { Request, Response } from "express"
import Admin from "../models/admin"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

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

export default { adminSignInController, adminSignUpController }  