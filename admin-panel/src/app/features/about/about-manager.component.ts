import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutService } from '../../core/services/about.service';

@Component({
  selector: 'app-about-manager',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>About Section</h1>
          <p>Tell your story and highlight your professional skills.</p>
        </div>
        <button class="btn btn-primary" [disabled]="isLoading || aboutForm.invalid" (click)="saveAbout()">
          <i class="fas fa-spinner fa-spin" *ngIf="isSaving"></i> 
          {{ isSaving ? 'Saving...' : 'Save Profile' }}
        </button>
      </div>

      <div class="alert alert-success" *ngIf="successMessage">{{ successMessage }}</div>
      <div class="alert alert-danger" *ngIf="errorMessage">{{ errorMessage }}</div>

      <div class="loading-spinner" *ngIf="isLoading">
        <i class="fas fa-circle-notch fa-spin"></i> Loading about data...
      </div>

      <div class="card" *ngIf="!isLoading">
        <div class="card-body">
          <form [formGroup]="aboutForm">
            <div class="form-group">
              <label>Professional Bio</label>
              <textarea formControlName="description" class="form-control" rows="6" placeholder="Describe your experience and engineering philosophy..."></textarea>
            </div>
            
            <div class="form-row">
               <div class="form-group col">
                 <label>Core Skills (comma separated)</label>
                 <input type="text" formControlName="skills" class="form-control" placeholder="Structural Analysis, BIM, Revit...">
               </div>
               <div class="form-group col">
                 <label>Preferred Tools (comma separated)</label>
                 <input type="text" formControlName="tools" class="form-control" placeholder="AutoCAD, SAP2000, Python...">
               </div>
            </div>

            <div class="form-group">
              <label>Resume / CV Link</label>
              <div class="input-with-icon">
                <i class="fas fa-link"></i>
                <input type="text" formControlName="resumeUrl" class="form-control" placeholder="https://drive.google.com/...">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 30px; max-width: 1000px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .title-section h1 { font-size: 24px; color: #1a202c; }
    .title-section p { color: #718096; }
    
    .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .card-body { padding: 30px; }
    .form-group { margin-bottom: 25px; }
    .form-group label { display: block; margin-bottom: 10px; font-weight: 500; color: #4a5568; }
    .form-control { width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 15px; }
    
    .input-with-icon { position: relative; }
    .input-with-icon i { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #a0aec0; }
    .input-with-icon input { padding-left: 40px; }

    .btn-primary { background: #3182ce; color: white; padding: 12px 24px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.2s;}
    .btn-primary:hover:not(:disabled) { background: #2b6cb0; }
    .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
    .form-row { display: flex; gap: 20px; }
    .col { flex: 1; }

    .alert { padding: 15px; border-radius: 6px; margin-bottom: 20px; }
    .alert-success { background: #c6f6d5; color: #22543d; border: 1px solid #9ae6b4; }
    .alert-danger { background: #fed7d7; color: #822727; border: 1px solid #feb2b2; }
    .loading-spinner { text-align: center; padding: 40px; color: #718096; font-size: 18px; }
  `]
})
export class AboutManagerComponent implements OnInit {
  aboutForm!: FormGroup;
  isLoading = true;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private aboutService: AboutService) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchData();
  }

  initForm() {
    this.aboutForm = this.fb.group({
      description: ['', Validators.required],
      skills: [''],
      tools: [''],
      resumeUrl: ['']
    });
  }

  fetchData() {
    this.isLoading = true;
    this.aboutService.getAboutData().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.aboutForm.patchValue({
            description: res.data.description,
            skills: (res.data.skills || []).join(', '),
            tools: (res.data.tools || []).join(', '),
            resumeUrl: res.data.resumeUrl
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load about data', err);
        this.isLoading = false;
      }
    });
  }

  saveAbout() {
    if (this.aboutForm.invalid) return;

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formVal = this.aboutForm.value;
    const data = {
      ...formVal,
      skills: formVal.skills ? formVal.skills.split(',').map((s: string) => s.trim()).filter((s:string) => s) : [],
      tools: formVal.tools ? formVal.tools.split(',').map((s: string) => s.trim()).filter((s:string) => s) : []
    };

    this.aboutService.updateAboutData(data).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res.success) {
          this.successMessage = 'About section updated successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = res.message || 'Failed to update about section.';
        }
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = 'An error occurred while saving.';
        console.error(err);
      }
    });
  }
}
