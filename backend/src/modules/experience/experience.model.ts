import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  role: string;
  duration: string;
  description: string;
  location: string;
}

const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
