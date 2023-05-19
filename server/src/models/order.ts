import { Schema, model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IDelivery {
  _id: Types.ObjectId;
  customerId: ObjectId;
  quantity: number;
  totalPrice: number;
  deliveryAddress: string;
  status: string;
  date: Date;
  products: {
    productId: ObjectId;
    name: string;
    price: number;
    description: string;
    quantity: number;
    status: string;
  }[];
  pdf: {
    data: Buffer;
    contentType: string;
  } | undefined;
}

const deliverySchema = new Schema<IDelivery>({
  customerId: { type: Types.ObjectId, required: true, ref: 'User' },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  deliveryAddress: { type: String, required: false, default: '' },
  status: { type: String, required: true },
  date: { type: Date, required: true },
  products: [
    {
      productId: { type: Types.ObjectId, required: true, ref: 'Product' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      status: { type: String, default: '' }
    },
  ],
  pdf: {
    data: Buffer,
    contentType: String
  }
});

export default model<IDelivery>('Delivery', deliverySchema);