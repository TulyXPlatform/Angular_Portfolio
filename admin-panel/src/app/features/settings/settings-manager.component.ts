import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-settings-manager',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>System Configuration</h1>
          <p>Global theme and system settings.</p>
        </div>
        <button class="btn btn-primary" [disabled]="isLoading" (click)="saveSettings()">
          <i class="fas fa-spinner fa-spin" *ngIf="isSaving"></i> 
          {{ isSaving ? 'Saving...' : 'Save Configuration' }}
        </button>
      </div>

      <div class="alert alert-success" *ngIf="successMessage">{{ successMessage }}</div>
      <div class="alert alert-danger" *ngIf="errorMessage">{{ errorMessage }}</div>

      <div class="loading-spinner" *ngIf="isLoading">
        <i class="fas fa-circle-notch fa-spin"></i> Loading system settings...
      </div>

      <div class="grid-layout" *ngIf="!isLoading">
        <form [formGroup]="settingsForm" class="card">
          <div class="card-header">Global Settings</div>
          <div class="card-body">
            <div class="form-group">
              <label>Site Title</label>
              <input type="text" formControlName="siteTitle" class="form-control" placeholder="TulyX Engineering">
            </div>
            <div class="form-group">
              <label>SEO Description</label>
              <textarea formControlName="seoDescription" class="form-control" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Google Analytics ID</label>
              <input type="text" formControlName="gaTrackingId" class="form-control" placeholder="UA-XXXXX-Y">
            </div>
          </div>
        </form>

        <form [formGroup]="settingsForm" class="card">
          <div class="card-header">Theme Options</div>
          <div class="card-body">
            <div class="form-group">
               <label>Primary Color</label>
               <input type="color" formControlName="primaryColor" class="form-control color-picker">
            </div>
            <div class="form-group">
               <label>Secondary Color</label>
               <input type="color" formControlName="secondaryColor" class="form-control color-picker">
            </div>
            <div class="form-group">
               <label>Enable Maintenance Mode</label>
               <div class="toggle-switch">
                 <input type="checkbox" formControlName="maintenanceMode" id="maintenance">
                 <label for="maintenance">System offline for updates</label>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 30px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .title-section h1 { font-size: 24px; color: #1a202c; margin-bottom: 5px; }
    .title-section p { color: #718096; margin: 0; }
    
    .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
    .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .card-header { padding: 15px 20px; font-weight: 600; border-bottom: 1px solid #edf2f7; color: #4a5568; }
    .card-body { padding: 20px; }
    
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 500; color: #4a5568; }
    .form-control { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; }
    .color-picker { height: 40px; padding: 5px; }
    
    .toggle-switch { display: flex; align-items: center; gap: 10px; }
    .toggle-switch input[type="checkbox"] { width: 18px; height: 18px; }
    
    .btn-primary { background: #3182ce; color: white; padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.2s;}
    .btn-primary:hover:not(:disabled) { background: #2b6cb0; }
    .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
    
    .alert { padding: 15px; border-radius: 6px; margin-bottom: 20px; }
    .alert-success { background: #c6f6d5; color: #22543d; border: 1px solid #9ae6b4; }
    .alert-danger { background: #fed7d7; color: #822727; border: 1px solid #feb2b2; }
    .loading-spinner { text-align: center; padding: 40px; color: #718096; font-size: 18px; }
  `]
})
export class SettingsManagerComponent implements OnInit {
  settingsForm!: FormGroup;
  isLoading = true;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchData();
  }

  initForm() {
    this.settingsForm = this.fb.group({
      siteTitle: [''],
      seoDescription: [''],
      gaTrackingId: [''],
      primaryColor: ['#ffb31a'],
      secondaryColor: ['#3399ff'],
      maintenanceMode: [false]
    });
  }

  fetchData() {
    this.isLoading = true;
    this.settingsService.getSettings().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.settingsForm.patchValue(res.data);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load settings', err);
        this.isLoading = false;
      }
    });
  }

  saveSettings() {
    if (this.settingsForm.invalid) return;

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.settingsService.updateSettings(this.settingsForm.value).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res.success) {
          this.successMessage = 'Settings updated successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = res.message || 'Failed to update settings.';
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
