import { Schema, model, Document } from 'mongoose';

interface INotification extends Document {
  customer: string;
  content: string;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  customer: { type: String, required: true, ref: 'User' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

export default model<INotification>('Notification', notificationSchema);