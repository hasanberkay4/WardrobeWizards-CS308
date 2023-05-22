import { Schema, model, Model, Types } from 'mongoose';
import Product from './product';
import { ObjectId } from 'mongodb';

interface IDiscount {
  productId: Types.ObjectId;
  discountRate: number;
  date: Date;
}

interface DiscountModel extends Model<IDiscount> {}

const discountSchema = new Schema<IDiscount>({
  productId: {type: Schema.Types.ObjectId, required:true, ref:"Product"},
  discountRate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default model<IDiscount, DiscountModel>('Discount', discountSchema);
