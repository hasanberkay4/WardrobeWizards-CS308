import { Schema, model, Model, Types } from 'mongoose';

export interface IComment {
    customerId: Types.ObjectId
    productId: Types.ObjectId
    date: Date
    description: String
    approved: Boolean
    rating: number
}

const commentSchema = new Schema<IComment>({
    customerId: {type: Schema.Types.ObjectId, required:true, ref:"User"},
    productId: {type: Schema.Types.ObjectId, required:true, ref:"Product"},
    date: {type:Date, required:true},
    description:{type:String, required:false},
    approved: {type:Boolean, required:true},
    rating: {type:Number, required:true}


});

interface CommentModel extends Model<IComment> {
    search(query: string): Promise<IComment[]>;
}



export default model<IComment, CommentModel>('Comment', commentSchema);


