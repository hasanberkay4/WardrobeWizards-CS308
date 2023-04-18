import { Schema, model } from 'mongoose';

interface IProduct {
    name: string;
    description: string;
    model: string;
    number: number;
    stock_quantity: number;
    initial_price: number;
    category: string;
    image: string;
    populariy: number;
    // wishlist: 
    // distributer_info:  
    // warranty_status: WarrantyStatus;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    model: { type: String, required: true },
    number: { type: Number, required: true },
    stock_quantity: { type: Number, required: true },
    initial_price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
});

export default model<IProduct>('Product', productSchema);