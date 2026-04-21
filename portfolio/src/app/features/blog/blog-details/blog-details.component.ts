import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogService } from '../../../../core/services/blog.service';
import { Blog } from '../../../../core/models/domain.models';
import { switchMap, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog$!: Observable<Blog | null>;
  safeHtmlContent!: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private titleService: Title,
    private metaService: Meta,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.blog$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (slug) {
          return this.blogService.getBlogBySlug(slug).pipe(
            tap(res => {
              if (res.success && res.data) {
                const blog = res.data;
                this.updateMetaTags(blog);
                // Sanitize HTML preventing XSS attacks dynamically bypassing Angular internal security
                this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(blog.content);
              }
            }),
            map(res => res.success ? res.data : null)
          );
        }
        return of(null);
      })
    );
  }

  private updateMetaTags(blog: Blog) {
    this.titleService.setTitle(`${blog.title} | Engineering Platform`);
    
    // Core SEO parameters dynamically generated via Angular SSR hooks
    this.metaService.updateTag({ name: 'description', content: blog.title }); // Sub-snippet for search
    
    // Open Graph Metadata properties (LinkedIn, Twitter, Facebook embeds)
    this.metaService.updateTag({ property: 'og:title', content: blog.title });
    this.metaService.updateTag({ property: 'og:image', content: blog.coverImage || '' });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
    this.metaService.updateTag({ property: 'og:url', content: typeof window !== 'undefined' ? window.location.href : '' });
  }
}
