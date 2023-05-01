import { Request, Response } from "express"
import User from "../models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const signUpController = async (req: Request, res: Response) => {
  try {

    // Get user input
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    // check if user already exist
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      email: email,
      password: hashedPassword,
      name: name
    });

    // save user to database
    const addedUser = await newUser.save()

    // return new user info
    res.status(200).json({ status: "success", userInfo: addedUser })
  }
  // if error
  catch (err) {
    return res.status(400).json({ errors: err });
  }
}

const signInController = async (req: Request, res: Response) => {
  try {
    // Get user input
    const email = req.body.email as string;
    const password = req.body.password as string;

    // Validate if user exist in our database
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send(400).json({ message: "User does not exist" })
    }

    // Validate password is users password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password!" });
    }

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY!,
      { expiresIn: "2h" }
    );

    // return success response and JWT token
    return res.status(200).json({ message: "Successfully Signed Up", token: token });
  }

  // if user not found or password not match
  catch (err) {
    return res.status(400).json({ errors: err });
  }
}

export default { signUpController, signInController }