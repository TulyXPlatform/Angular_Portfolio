import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../core/models/domain.models';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { MediaViewerComponent } from '../../../../shared/components/media-viewer/media-viewer.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project$!: Observable<Project | null>;
  allProjects: Project[] = [];
  currentIndex: number = -1;

  @ViewChild('mediaViewer') mediaViewer!: MediaViewerComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // 1. Fetch all projects sequentially to know current index for Prev/Next
    this.projectService.getProjects().subscribe(res => {
      if (res.success && res.data) {
        this.allProjects = res.data;
        this.updateIndex();
      }
    });

    // 2. Listen to route params for slug changes dynamically
    this.project$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (slug) {
          return this.projectService.getProjectBySlug(slug).pipe(
            map(res => res.success ? res.data : null),
            tap(() => this.updateIndex())
          );
        }
        return [null];
      })
    );
  }

  private updateIndex() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug && this.allProjects.length > 0) {
      this.currentIndex = this.allProjects.findIndex(p => p.slug === slug);
    }
  }

  openGallery(index: number) {
    if (this.mediaViewer) {
      this.mediaViewer.open(index);
    }
  }

  navigateTo(direction: 'prev' | 'next') {
    if (direction === 'prev' && this.currentIndex > 0) {
      this.router.navigate(['/projects', this.allProjects[this.currentIndex - 1].slug]);
    } else if (direction === 'next' && this.currentIndex < this.allProjects.length - 1) {
      this.router.navigate(['/projects', this.allProjects[this.currentIndex + 1].slug]);
    }
  }

  get hasPrev() { return this.currentIndex > 0; }
  get hasNext() { return this.currentIndex >= 0 && this.currentIndex < this.allProjects.length - 1; }
}
