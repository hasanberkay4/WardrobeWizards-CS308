import { Router } from "express";
import transactionController from "../controller/transactionController"

const transactionRouter = Router();

transactionRouter.post('/add', transactionController.addTransaction);
transactionRouter.get('/alltransactions', transactionController.getAllTransactions);
transactionRouter.get('/type/:type', transactionController.getTransactionsByType);



export { transactionRouter }
