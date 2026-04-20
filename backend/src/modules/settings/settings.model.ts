import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  siteTitle: string;
  logoUrl: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundType: 'color' | 'image' | 'video';
    backgroundValue: string;
    fontFamily: string;
  };
  socialLinks: { name: string; url: string }[];
}

const SettingsSchema = new Schema({
  siteTitle: { type: String, required: true },
  logoUrl: { type: String },
  theme: {
    primaryColor: { type: String, default: '#000000' },
    secondaryColor: { type: String, default: '#ffffff' },
    backgroundType: { type: String, enum: ['color', 'image', 'video'], default: 'color' },
    backgroundValue: { type: String, default: '#ffffff' },
    fontFamily: { type: String, default: 'Inter' }
  },
  socialLinks: [{
    name: { type: String },
    url: { type: String }
  }]
}, { timestamps: true });

export default mongoose.model<ISettings>('Settings', SettingsSchema);
