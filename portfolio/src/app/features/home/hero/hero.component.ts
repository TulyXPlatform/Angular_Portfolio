import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../../core/services/hero.service';
import { Hero, ApiResponse } from '../../../core/models/domain.models';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  heroData$!: Observable<Hero | null>;

  constructor(private heroService: HeroService, private seoService: SeoService) { }

  ngOnInit(): void {
    // Fetch dynamic content + hook universal SEO
    this.heroData$ = this.heroService.getHero().pipe(
      tap((res: ApiResponse<Hero>) => {
        if (res && res.success && res.data) {
           this.seoService.generateTags({
             title: res.data.title || 'Home Base',
             description: res.data.subtitle || 'Structural Architectural Engineering',
             image: this.isImage(res.data.backgroundMedia) ? res.data.backgroundMedia : undefined
           });
        } else {
           // Fallback pre-render tags
           this.seoService.generateTags({
             title: 'Home Base',
             description: 'Structural Architectural Engineering'
           });
        }
      }),
      map((res: ApiResponse<Hero>) => res.success ? res.data : null),
      shareReplay(1)
    );
  }

  isColor(value: string): boolean {
    if (!value) return false;
    return value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl');
  }

  isVideo(value: string): boolean {
    if (!value) return false;
    return value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.ogg');
  }

  isImage(value: string): boolean {
    if (!value) return false;
    return !this.isColor(value) && !this.isVideo(value);
  }
}
