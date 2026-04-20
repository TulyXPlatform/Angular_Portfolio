import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  technologies: string[];
  media: {
    type: 'image' | 'video' | 'pdf' | 'cad';
    url: string;
    thumbnail: string;
  }[];
  featured: boolean;
  createdAt: Date;
}

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  technologies: [{ type: String }],
  media: [{
    type: { type: String, enum: ['image', 'video', 'pdf', 'cad'], required: true },
    url: { type: String, required: true },
    thumbnail: { type: String }
  }],
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
