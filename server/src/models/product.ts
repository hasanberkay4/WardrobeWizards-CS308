import { Schema, model, Model, Types } from 'mongoose';

export interface IProduct {
    name: string;
    description: string;
    stock_quantity: number;
    initial_price: number;
    category_ids: string[];
    image: string;
    popularity: number;
    rating: number;
    number_of_voters: number;
    warrant_status: boolean;
    delivery_info: string;
    expense: number;
    discountRate: number;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    stock_quantity: { type: Number, required: true },
    initial_price: { type: Number, required: true },
    category_ids: [
        {
            type: String,
            required: true,
            ref: 'Category'
        }
    ],
    image: { type: String, required: true },
    popularity: { type: Number, required: true },
    rating: { type: Number, required: true },
    number_of_voters: { type: Number, required: true },
    warrant_status: { type: Boolean, required: false, default: false },
    delivery_info: { type: String, required: false },
    expense: { type: Number, required: true },
    discountRate: { type: Number, required: false, default: 0 },
});

interface ProductModel extends Model<IProduct> {
    search(query: string): Promise<IProduct[]>;
}

productSchema.statics.search = async function (query: string): Promise<IProduct[]> {
    const words = query.split(' ').map(w => `\\b${w}\\b`).join('|');
    const regex = new RegExp(words, 'i');

    const matches = await this.find({
        $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
        ],
    });

    const calculateMatchScore = (str: string, queryWords: string[], regex: RegExp) => {
        const matchedWords = str.match(regex) || [];
        return queryWords.reduce((score, word) => {
            return score + matchedWords.filter(matchedWord => matchedWord.toLowerCase() === word.toLowerCase()).length;
        }, 0);
    };

    const queryWords = query.split(' ');

    const sortedMatches = matches.sort((a: { name: string; description: string; }, b: { name: string; description: string; }) => {
        const matchScoreA = calculateMatchScore(a.name + ' ' + a.description, queryWords, regex);
        const matchScoreB = calculateMatchScore(b.name + ' ' + b.description, queryWords, regex);

        if (matchScoreA > matchScoreB) {
            return -1;
        }
        if (matchScoreA < matchScoreB) {
            return 1;
        }
        return 0;
    });

    return sortedMatches;
};



export default model<IProduct, ProductModel>('Product', productSchema);


