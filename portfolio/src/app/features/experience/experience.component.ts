import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ExperienceService } from '../../../../core/services/experience.service';
import { Experience } from '../../../../core/models/domain.models';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, AfterViewInit {
  experiences: Experience[] = [];
  
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;

  constructor(private experienceService: ExperienceService, private seoService: SeoService) { }

  ngOnInit(): void {
    // Generate pre-loaded SEO Tags natively
    this.seoService.generateTags({
      title: 'Career Trajectory',
      description: 'Historical records mapping robust architecture, civil engineering roles, and commercial build timelines.'
    });

    // Fetch dynamic content without hardcoding any defaults
    this.experienceService.getExperience().subscribe(res => {
      if (res.success && res.data) {
        this.experiences = res.data;
      }
    });
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
    
    // Subscribe to changes in query list in case data arrives after view init
    this.timelineItems.changes.subscribe(() => {
      this.setupIntersectionObserver();
    });
  }

  private setupIntersectionObserver() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
      };

      const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerInstance.unobserve(entry.target);
          }
        });
      }, options);

      // Add a slight delay to allow items to render and position properly
      setTimeout(() => {
        this.timelineItems.forEach(item => {
          observer.observe(item.nativeElement);
        });
      }, 100);
    } else {
      // Fallback for SSR or older browsers
      this.timelineItems.forEach(item => {
        item.nativeElement.classList.add('visible');
      });
    }
  }
}
