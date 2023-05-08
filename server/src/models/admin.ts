import { Schema, model, connect } from 'mongoose';

interface IAdmin {
    username: string
    password: string,
    title: string,
}

const adminSchema = new Schema<IAdmin>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    title: { type: String, required: true },
});

export default model<IAdmin>('Admin', adminSchema);

