import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  // Using a generic platform title suffix
  private baseTitle = 'Engineering Portfolio';

  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private doc: Document) {}

  generateTags(config: SeoConfig) {
    const defaultImage = 'https://placeholder.com/default-share.jpg'; 
    
    // 1. Dynamic Title Tag Injection
    this.title.setTitle(`${config.title} | ${this.baseTitle}`);

    // 2. Standard Search Engine Meta
    this.meta.updateTag({ name: 'description', content: config.description });

    // 3. Twitter Card Setup
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image || defaultImage });

    // 4. Open Graph Metadata (LinkedIn, FB, Slack previews)
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image || defaultImage });
    
    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
      this.setCanonicalUrl(config.url);
    }
  }

  private setCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
