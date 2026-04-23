import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  tags: string[];
}

const BlogSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  coverImage: { type: String, required: true },
  tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);
