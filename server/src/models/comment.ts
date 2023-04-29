import { Schema, model, Model, Types } from 'mongoose';

export interface IComment {
    customerId: Types.ObjectId
    productId: Types.ObjectId
    Date: Date
    Description: String
    Approved: Boolean
    Rating: number
}

const commentSchema = new Schema<IComment>({
    customerId: {type: Schema.Types.ObjectId, required:true, ref:"User"},
    productId: {type: Schema.Types.ObjectId, required:true, ref:"Product"},
    Date: {type:Date, required:true},
    Description:{type:String, required:false},
    Approved: {type:Boolean, required:true},
    Rating: {type:Number, required:true}


});

interface CommentModel extends Model<IComment> {
    search(query: string): Promise<IComment[]>;
}



export default model<IComment, CommentModel>('Comment', commentSchema);


