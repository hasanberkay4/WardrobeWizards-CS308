import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt"

const getUserById = async (req: Request, res: Response) => {
    // get user id from request :id
    const id = req.params.id;

    console.log("userid:", id);
    // find user by id

    try {
        const user = await User.findById(id);
        console.log("user:", user);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: 'user doesnt exist' });
    }
}

const updateUserById = async (req: Request, res: Response) => {
    // get user id from request :id
    const id = req.params.id;

    // update user info
    try {

        const { name, surname, email, password, address } = req.body;
        const user = await User.findById(id);

        if (user) {
            user.name = name || user.name;
            user.surname = surname || user.surname;
            user.email = email || user.email;
            user.password = password || user.password;
            user.address = address || user.address;

            if (user.isModified('password')) {
                // hash the password
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
            }
        }

        const updatedUser = await user?.save();
        res.json({
            name: updatedUser?.name,
            surname: updatedUser?.surname,
            email: updatedUser?.email,
            address: updatedUser?.address,
        });

    } catch (error) {
        console.error(error);
        res.status(404).json({ status: 'user doesnt exist' });
    }
}



const addToWallet = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { amount } = req.body;

    try {
        const user = await User.findById(id);

        if (user) {
            user.wallet += amount;

            const updatedUser = await user.save();
            res.json({
                wallet: updatedUser.wallet,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: 'user doesnt exist' });
    }
}



export default { getUserById, updateUserById,addToWallet }