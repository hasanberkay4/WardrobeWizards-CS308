import { Schema, model, connect } from 'mongoose';

interface IUser {
    email: string,
    name: string,
    surname: string,
    password: string,
    address: string,
    wallet: number,
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false, default: "" },
    wallet: { type: Number, required: true, default: 0 },
});

export default model<IUser>('User', userSchema);

