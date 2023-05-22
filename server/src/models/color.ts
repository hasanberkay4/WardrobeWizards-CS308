import { Schema, model, Model, Types } from 'mongoose';
import Product from "./product"
import { IProduct } from './product';


interface IColor {
    name: string;
    slug: string;
}

interface ColorModel extends Model<IColor> {
    findProducts(colorId: Types.ObjectId): Promise<IProduct[]>;
}

const colorSchema = new Schema<IColor>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
});

colorSchema.statics.findProducts = async function (colorId: Types.ObjectId) {
    const products = await Product.find({ color_id: colorId }).exec();
    return products;
};

export default model<IColor, ColorModel>('Color', colorSchema);


