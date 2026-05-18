import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HeroService } from '../../core/services/hero.service';

@Component({
  selector: 'app-hero-manager',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>Hero Section Management</h1>
          <p>Update your portfolio's main landing message and background media.</p>
        </div>
        <div class="action-section">
          <button class="btn btn-primary" [disabled]="isLoading || heroForm.invalid" (click)="saveHero()">
            <i class="fas fa-spinner fa-spin" *ngIf="isSaving"></i> 
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <div class="alert alert-success" *ngIf="successMessage">{{ successMessage }}</div>
      <div class="alert alert-danger" *ngIf="errorMessage">{{ errorMessage }}</div>

      <div class="loading-spinner" *ngIf="isLoading">
        <i class="fas fa-circle-notch fa-spin"></i> Loading hero data...
      </div>

      <form [formGroup]="heroForm" *ngIf="!isLoading">
        <div class="grid-container">
          <div class="card main-card">
            <div class="card-header">Hero Details</div>
            <div class="card-body">
              <div class="form-group">
                <label>Main Title</label>
                <input type="text" formControlName="title" class="form-control" placeholder="e.g. PRECISION_ENGINEERING.EXE">
                <div class="text-danger mt-1" *ngIf="heroForm.get('title')?.invalid && heroForm.get('title')?.touched">Title is required.</div>
              </div>
              <div class="form-group">
                <label>Subtitle / Slogan</label>
                <textarea formControlName="subtitle" class="form-control" rows="3"></textarea>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <label>Overlay Opacity</label>
                  <input type="range" formControlName="overlayOpacity" min="0" max="1" step="0.1" class="form-control">
                  <div class="range-val">{{ heroForm.get('overlayOpacity')?.value }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card side-card">
            <div class="card-header">Media & CTA</div>
            <div class="card-body">
               <div class="form-group">
                 <label>Background Media URL (Image/Video/Color)</label>
                 <input type="text" formControlName="backgroundMedia" class="form-control" placeholder="URL or HEX color">
               </div>
               
               <div class="media-preview" *ngIf="heroForm.get('backgroundMedia')?.value">
                 <img [src]="heroForm.get('backgroundMedia')?.value" style="width:100%; border-radius:8px;" onerror="this.style.display='none'">
               </div>

               <hr>
               <div class="cta-section" formArrayName="ctaButtons">
                 <label>Call to Action Buttons</label>
                 <div class="cta-item" *ngFor="let cta of ctaButtons.controls; let i=index" [formGroupName]="i">
                   <input type="text" formControlName="label" class="form-control" placeholder="Label">
                   <input type="text" formControlName="link" class="form-control" placeholder="Link">
                   <button type="button" class="btn btn-danger btn-sm" (click)="removeCta(i)"><i class="fas fa-times"></i></button>
                 </div>
                 <button type="button" class="btn btn-link mt-2" (click)="addCta()">+ Add Button</button>
               </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .page-container { padding: 30px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .title-section h1 { font-size: 24px; margin-bottom: 5px; color: #1a202c; }
    .title-section p { color: #718096; margin: 0; }
    
    .grid-container { display: grid; grid-template-columns: 2fr 1fr; gap: 25px; }
    .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden; }
    .card-header { padding: 15px 20px; font-weight: 600; border-bottom: 1px solid #edf2f7; color: #4a5568; }
    .card-body { padding: 20px; }

    .form-group { margin-bottom: 20px; }
    .form-row { display: flex; gap: 20px; }
    .form-row .col { flex: 1; }
    .form-group label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #4a5568; }
    .form-control { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; }
    
    .btn { padding: 10px 20px; border-radius: 6px; font-weight: 500; cursor: pointer; transition: 0.2s; border: none; }
    .btn-primary { background: #3182ce; color: white; }
    .btn-primary:hover:not(:disabled) { background: #2b6cb0; }
    .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
    .btn-danger { background: #e53e3e; color: white; padding: 10px; }
    .btn-link { background: transparent; color: #3182ce; padding: 5px; }
    .btn-sm { padding: 5px 10px; }
    
    .cta-item { display: flex; gap: 10px; margin-bottom: 10px; }
    .alert { padding: 15px; border-radius: 6px; margin-bottom: 20px; }
    .alert-success { background: #c6f6d5; color: #22543d; border: 1px solid #9ae6b4; }
    .alert-danger { background: #fed7d7; color: #822727; border: 1px solid #feb2b2; }
    .text-danger { color: #e53e3e; font-size: 12px; }
    .mt-1 { margin-top: 5px; }
    .mt-2 { margin-top: 10px; }
    .range-val { font-size: 12px; color: #718096; margin-top: 5px; text-align: right; }
    .loading-spinner { text-align: center; padding: 40px; color: #718096; font-size: 18px; }
  `]
})
export class HeroManagerComponent implements OnInit {
  heroForm!: FormGroup;
  isLoading = true;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private heroService: HeroService) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchData();
  }

  initForm() {
    this.heroForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      backgroundMedia: [''],
      overlayOpacity: [0.6],
      ctaButtons: this.fb.array([])
    });
  }

  get ctaButtons() {
    return this.heroForm.get('ctaButtons') as FormArray;
  }

  addCta(cta?: any) {
    this.ctaButtons.push(this.fb.group({
      label: [cta?.label || ''],
      link: [cta?.link || '']
    }));
  }

  removeCta(index: number) {
    this.ctaButtons.removeAt(index);
  }

  fetchData() {
    this.isLoading = true;
    this.heroService.getHeroData().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.heroForm.patchValue({
            title: res.data.title,
            subtitle: res.data.subtitle,
            backgroundMedia: res.data.backgroundMedia,
            overlayOpacity: res.data.overlayOpacity
          });
          
          if (res.data.ctaButtons && res.data.ctaButtons.length) {
            res.data.ctaButtons.forEach((btn: any) => this.addCta(btn));
          } else {
            this.addCta(); // Add one empty by default
          }
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load hero data', err);
        this.addCta(); // Add one empty
        this.isLoading = false;
      }
    });
  }

  saveHero() {
    if (this.heroForm.invalid) return;
    
    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.heroService.updateHeroData(this.heroForm.value).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res.success) {
          this.successMessage = 'Hero section updated successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = res.message || 'Failed to update hero section.';
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
