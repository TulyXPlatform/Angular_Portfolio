import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../core/services/about.service';
import { About, ApiResponse } from '../../core/models/domain.models';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutData$!: Observable<About | null>;

  constructor(private aboutService: AboutService, private seoService: SeoService) { }

  ngOnInit(): void {
    // Initial sync
    this.seoService.generateTags({
      title: 'Systems About',
      description: 'Discover the technical software stacks and core engineering skills behind the architecture.'
    });

    this.aboutData$ = this.aboutService.getAbout().pipe(
      tap((res: ApiResponse<About>) => {
         if (res && res.success && res.data) {
            this.seoService.generateTags({
               title: 'Systems About',
               // Slice string properly for neat SEO metatag injection
               description: res.data.description.substring(0, 150) + '...'
            });
         }
      }),
      map((res: ApiResponse<About>) => res.success ? res.data : null),
      shareReplay(1)
    );
  }
}
