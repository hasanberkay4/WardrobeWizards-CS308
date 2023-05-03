import { Schema, model, connect } from 'mongoose';

interface IUser {
    email: string,
    name: string,
    surname: string,
    password: string,
    address: string
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
});

export default model<IUser>('User', userSchema);

