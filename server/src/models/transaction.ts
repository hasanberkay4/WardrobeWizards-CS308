import { Schema, model, Model } from 'mongoose';

interface ITransaction {
    amount: number;
    type: String;
    date: Date;
}

const transactionSchema = new Schema<ITransaction>({
    amount: {type:Number, required:true},
    type:{type:String, required:true},
    date: {type:Date, default: Date.now}
});

interface TransactionModel extends Model<ITransaction> {
    search(query: string): Promise<ITransaction[]>;
}

export default model<ITransaction, TransactionModel>('Transaction', transactionSchema);
