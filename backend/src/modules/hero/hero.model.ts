import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
  title: string;
  subtitle: string;
  ctaButtons: { label: string; link: string }[];
  backgroundMedia: string;
  overlayOpacity: number;
  avatarUrl: string;
}

const HeroSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  ctaButtons: [{
    label: { type: String, required: true },
    link: { type: String, required: true }
  }],
  backgroundMedia: { type: String, required: true },
  overlayOpacity: { type: Number, default: 0.5 },
  avatarUrl: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model<IHero>('Hero', HeroSchema);
