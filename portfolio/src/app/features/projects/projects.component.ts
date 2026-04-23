import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { Project, ApiResponse } from '../../core/models/domain.models';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  isLoading = true;

  // Filters State
  categories: string[] = [];
  allTags: string[] = [];
  
  selectedCategory: string = 'ALL';
  selectedTag: string | null = null;
  searchQuery: string = '';

  constructor(private projectService: ProjectService, private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Structural Projects Matrix',
      description: 'Sort and filter structural engineering design files, commercial schematics, and infrastructure payloads.'
    });

    this.projectService.getProjects().subscribe({
      next: (res: ApiResponse<Project[]>) => {
        if (res.success && res.data) {
          this.projects = res.data;
          this.filteredProjects = [...this.projects];
          this.extractFilterMetadata();
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private extractFilterMetadata() {
    const cats = new Set<string>();
    const tgs = new Set<string>();
    
    this.projects.forEach(p => {
      if (p.category) cats.add(p.category);
      if (p.tags && p.tags.length) p.tags.forEach(t => tgs.add(t));
    });

    this.categories = ['ALL', ...Array.from(cats)];
    this.allTags = Array.from(tgs);
  }

  // Event Handlers
  onSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  toggleTag(tag: string) {
    if (this.selectedTag === tag) {
      this.selectedTag = null; // deselect
    } else {
      this.selectedTag = tag;
    }
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredProjects = this.projects.filter(p => {
      // 1. Search Query
      const matchesSearch = p.title.toLowerCase().includes(this.searchQuery) || 
                            p.description.toLowerCase().includes(this.searchQuery);
                            
      // 2. Category Match
      const matchesCategory = this.selectedCategory === 'ALL' || p.category === this.selectedCategory;
      
      // 3. Tag Match
      const matchesTag = this.selectedTag ? (p.tags && p.tags.includes(this.selectedTag)) : true;

      return matchesSearch && matchesCategory && matchesTag;
    });
  }

  trackById(index: number, item: Project): string {
    return item._id || index.toString();
  }

  getThumbnail(project: Project): string {
    if (!project.media || project.media.length === 0) return 'assets/placeholder.jpg';
    const firstMedia = project.media[0];
    return firstMedia.thumbnail || firstMedia.url;
  }
}
