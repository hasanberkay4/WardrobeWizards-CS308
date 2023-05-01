import { Schema, model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';


export interface IDelivery {
  customerId: ObjectId;
  quantity: number;
  totalPrice: number;
  deliveryAddress: string;
  status: string;
  date: Date;
  storeId: ObjectId;
  products: {
    productId: ObjectId;
    name: string;
    price: number;
    description: string;
    quantity: number;
  }[];
}

const deliverySchema = new Schema<IDelivery>({
  customerId: { type: Types.ObjectId, required: true, ref: 'Customer' },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true },
  storeId: { type: Types.ObjectId, required: true, ref: 'Store' },
  products: [
    {
      productId: { type: Types.ObjectId, required: true, ref: 'Product' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: {type: String, required: true},
      quantity: {type: Number, required: true},
    },
  ],
});

export default model<IDelivery>('Delivery', deliverySchema);