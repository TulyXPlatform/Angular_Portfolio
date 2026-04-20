import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  description: string;
  skills: string[];
  tools: string[];
  resumeUrl: string;
}

const AboutSchema = new Schema({
  description: { type: String, required: true },
  skills: [{ type: String }],
  tools: [{ type: String }],
  resumeUrl: { type: String }
}, { timestamps: true });

export default mongoose.model<IAbout>('About', AboutSchema);
