import { Schema, model, Model, Types } from 'mongoose';
import Product from "./product"
import { IProduct } from './product';


interface IModel {
    name: string;
    slug: string;
}

interface ModelModel extends Model<IModel> {
    findProducts(modelId: Types.ObjectId): Promise<IProduct[]>;
}

const modelSchema = new Schema<IModel>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
});

modelSchema.statics.findProducts = async function (modelId: Types.ObjectId) {
    const products = await Product.find({ model_id: modelId }).exec();
    return products;
};

export default model<IModel, ModelModel>('Model', modelSchema);


