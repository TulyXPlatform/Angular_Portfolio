import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
  projects: any[] = [];
  isLoading = true;
  
  showModal = false;
  isSaving = false;
  projectForm!: FormGroup;
  editingId: string | null = null;

  constructor(private fb: FormBuilder, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchProjects();
  }
  
  initForm() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      category: ['Infrastructure', Validators.required],
      featured: [false],
      // Media could be handled via array or string for now (simple string for MVP)
      mediaUrl: [''] 
    });
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
    this.editingId = project ? project._id : null;
    if (project) {
      this.projectForm.patchValue({
        title: project.title,
        slug: project.slug,
        description: project.description,
        category: project.category,
        featured: project.featured,
        mediaUrl: project.media && project.media.length > 0 ? project.media[0].url : ''
      });
    } else {
      this.projectForm.reset({ category: 'Infrastructure', featured: false });
    }
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
    this.editingId = null;
  }
  
  saveProject() {
    if (this.projectForm.invalid) return;
    this.isSaving = true;
    
    // Convert mediaUrl to media array expected by backend
    const formValue = { ...this.projectForm.value };
    formValue.media = formValue.mediaUrl ? [{ type: 'image', url: formValue.mediaUrl }] : [];
    delete formValue.mediaUrl;
    
    const obs$ = this.editingId 
      ? this.projectService.updateProject(this.editingId, formValue)
      : this.projectService.createProject(formValue);
      
    obs$.subscribe({
      next: (res) => {
        if(res.success) {
          this.fetchProjects();
          this.closeModal();
        }
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error saving project:', err);
        this.isSaving = false;
      }
    });
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
