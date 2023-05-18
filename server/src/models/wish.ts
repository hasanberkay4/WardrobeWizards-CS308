import { Schema, model, Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IWish{
    customer: string;
    product: string;
    addedAt: Date;
}

const wishSchema = new Schema<IWish>({
    customer: { type: String, required: true, ref: 'User' },
    product: { type: String, required: true, ref: 'Product' },
    addedAt: { type: Date, default: Date.now, required: true },
});

export default model<IWish>('Wish', wishSchema);