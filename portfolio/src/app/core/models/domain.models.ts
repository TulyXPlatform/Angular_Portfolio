export interface Settings {
  _id?: string;
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

export interface Hero {
  _id?: string;
  title: string;
  subtitle: string;
  ctaButtons: { label: string; link: string }[];
  backgroundMedia: string;
  overlayOpacity: number;
}

export interface About {
  _id?: string;
  description: string;
  skills: string[];
  tools: string[];
  resumeUrl: string;
}

export interface Project {
  _id?: string;
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
  createdAt?: string;
}

export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  tags: string[];
  createdAt?: string;
}

export interface Experience {
  _id?: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  location: string;
}

export interface ContactData {
  _id?: string;
  email: string;
  phone: string;
  address: string;
  mapEmbedUrl: string;
}

export interface Inquiry {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}
