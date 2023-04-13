import { Schema, model, connect } from 'mongoose';

interface IProduct{
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
});

export default model<IProduct>('Product', productSchema);