import { Schema, model, Model } from 'mongoose';

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

interface ProductModel extends Model<IProduct> {
    search(query: string): Promise<IProduct[]>;
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

productSchema.statics.search = async function (query: string): Promise<IProduct[]> {
    const words = query.split(' ').map(w => `\\b${w}\\b`).join('|');
    const regex = new RegExp(words, 'i');
    // NOT SEPERATE WORDS const regex = new RegExp(`.*${query}.*`, 'i');
    // COMPLEX (FOR PARTIAL AND SEPERATE WORDS) const regex = new RegExp(`(${query.split(' ').join('|')})|(${query.split(' ').map(w => `(?=.*${w})`).join('')}${query.split(' ').map(w => `\\b${w}\\b`).join('')})`, 'i');
    return this.find({
        $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
        ],
    });
};

export default model<IProduct, ProductModel>('Product', productSchema);


