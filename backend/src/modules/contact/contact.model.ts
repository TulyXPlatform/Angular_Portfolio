import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  email: string;
  phone: string;
  address: string;
  mapEmbedUrl: string;
}

const ContactSchema = new Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  mapEmbedUrl: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IContact>('Contact', ContactSchema);
