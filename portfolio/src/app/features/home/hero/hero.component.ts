import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../../../core/services/hero.service';
import { Hero } from '../../../../core/models/domain.models';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  heroData$!: Observable<Hero | null>;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    // Fetch dynamic content without hardcoding any defaults
    this.heroData$ = this.heroService.getHero().pipe(
      map(res => res.success ? res.data : null),
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
