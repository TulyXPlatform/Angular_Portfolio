import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
  projects: any[] = [];
  isLoading = true;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (res) => {
        if (res.success) {
          this.projects = res.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.isLoading = false;
      }
    });
  }

  openProjectModal(project?: any) {
    // Modal logic would go here
    console.log('Opening modal for:', project || 'New Project');
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.fetchProjects();
          }
        },
        error: (err) => console.error('Error deleting project:', err)
      });
    }
  }
}
