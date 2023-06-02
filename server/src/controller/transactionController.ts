import { Request, Response } from "express"
import Transaction from "../models/transaction"
import { validationResult } from 'express-validator';




const addTransaction = async (req: Request, res: Response) => {
    try {
        /*
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        */

        console.log(req.body)
        const newTransaction = new Transaction({
            amount: req.body.amount,
            type: req.body.type,
        });

        const addedTransaction = await newTransaction.save();
        res.status(200).json({ status: "success", transaction: addedTransaction });
    } catch (error) {
        res.status(500).json({ status: "Server error" });
    }
};

const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server error" });
    }
};



const getTransactionsByType = async (req: Request, res: Response) => {
    try {
        const transactionType = req.params.type;
        const transactions = await Transaction.find({ type: transactionType });
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server error" });
    }
};


export default { addTransaction, getAllTransactions, getTransactionsByType }
