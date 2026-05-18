import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>Contact Information</h1>
          <p>Update your public contact details and office location.</p>
        </div>
        <button class="btn btn-primary" [disabled]="isLoading || contactForm.invalid" (click)="saveContact()">
          <i class="fas fa-spinner fa-spin" *ngIf="isSaving"></i> 
          {{ isSaving ? 'Saving...' : 'Update Info' }}
        </button>
      </div>

      <div class="alert alert-success" *ngIf="successMessage">{{ successMessage }}</div>
      <div class="alert alert-danger" *ngIf="errorMessage">{{ errorMessage }}</div>

      <div class="loading-spinner" *ngIf="isLoading">
        <i class="fas fa-circle-notch fa-spin"></i> Loading contact data...
      </div>

      <form [formGroup]="contactForm" *ngIf="!isLoading">
        <div class="grid-layout">
          <div class="card">
            <div class="card-header">Communication Channels</div>
            <div class="card-body">
              <div class="form-group">
                <label>Professional Email</label>
                <input type="email" formControlName="email" class="form-control" placeholder="engineer@tulyx.platform">
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="text" formControlName="phone" class="form-control" placeholder="+1 (555) 010-9988">
              </div>
              <div class="form-group">
                <label>Office Address</label>
                <textarea formControlName="address" class="form-control" rows="3" placeholder="Sector 7, Engineering District, Cloud City"></textarea>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">Map Integration</div>
            <div class="card-body">
              <div class="form-group">
                <label>Google Maps Embed URL</label>
                <input type="text" formControlName="mapEmbedUrl" class="form-control">
              </div>
              <div class="map-preview" *ngIf="contactForm.get('mapEmbedUrl')?.value">
                 <iframe [src]="getSafeMapUrl()" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
              </div>
              <div class="map-preview" *ngIf="!contactForm.get('mapEmbedUrl')?.value">
                <div class="placeholder-map">
                   <i class="fas fa-map-marked-alt"></i>
                   <span>Map Preview Area</span>
                </div>
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
    
    .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
    .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .card-header { padding: 15px 20px; font-weight: 600; border-bottom: 1px solid #edf2f7; }
    .card-body { padding: 20px; }
    
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 500; color: #4a5568; }
    .form-control { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; }
    
    .placeholder-map { height: 200px; background: #f7fafc; border-radius: 8px; border: 2px dashed #e2e8f0; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #a0aec0; }
    .placeholder-map i { font-size: 32px; margin-bottom: 10px; }
    
    .btn-primary { background: #3182ce; color: white; padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.2s;}
    .btn-primary:hover:not(:disabled) { background: #2b6cb0; }
    .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
    
    .alert { padding: 15px; border-radius: 6px; margin-bottom: 20px; }
    .alert-success { background: #c6f6d5; color: #22543d; border: 1px solid #9ae6b4; }
    .alert-danger { background: #fed7d7; color: #822727; border: 1px solid #feb2b2; }
    .loading-spinner { text-align: center; padding: 40px; color: #718096; font-size: 18px; }
  `]
})
export class ContactManagerComponent implements OnInit {
  contactForm!: FormGroup;
  isLoading = true;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder, 
    private contactService: ContactService,
    private sanitizer: import('@angular/platform-browser').DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchData();
  }

  initForm() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      mapEmbedUrl: ['']
    });
  }

  fetchData() {
    this.isLoading = true;
    this.contactService.getContactData().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.contactForm.patchValue({
            email: res.data.email,
            phone: res.data.phone,
            address: res.data.address,
            mapEmbedUrl: res.data.mapEmbedUrl
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load contact data', err);
        this.isLoading = false;
      }
    });
  }

  saveContact() {
    if (this.contactForm.invalid) return;

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.contactService.updateContactData(this.contactForm.value).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res.success) {
          this.successMessage = 'Contact information updated successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = res.message || 'Failed to update contact info.';
        }
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = 'An error occurred while saving.';
        console.error(err);
      }
    });
  }

  getSafeMapUrl() {
    const url = this.contactForm.get('mapEmbedUrl')?.value;
    if (url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return null;
  }
}
