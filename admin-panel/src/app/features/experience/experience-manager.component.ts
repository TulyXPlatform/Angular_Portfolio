import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperienceService } from '../../core/services/experience.service';

@Component({
  selector: 'app-experience-manager',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>Career Timeline</h1>
          <p>Manage your professional experience and academic background.</p>
        </div>
        <button class="btn btn-primary" (click)="openModal()"><i class="fas fa-plus"></i> Add Experience</button>
      </div>

      <div class="alert alert-danger" *ngIf="errorMessage">{{ errorMessage }}</div>
      
      <div class="loading-spinner" *ngIf="isLoading">
        <i class="fas fa-circle-notch fa-spin"></i> Loading experience...
      </div>

      <div class="experience-list" *ngIf="!isLoading && experiences.length > 0">
        <div class="exp-card" *ngFor="let exp of experiences">
          <div class="exp-icon">
            <i class="fas fa-briefcase" *ngIf="exp.type === 'work'"></i>
            <i class="fas fa-graduation-cap" *ngIf="exp.type === 'education'"></i>
          </div>
          <div class="exp-info">
            <h3>{{ exp.title }}</h3>
            <span class="company">{{ exp.company }}</span>
            <span class="date">{{ exp.startDate | date:'MMM yyyy' }} - {{ exp.current ? 'Present' : (exp.endDate | date:'MMM yyyy') }}</span>
          </div>
          <div class="exp-actions">
            <button class="btn-icon" (click)="openModal(exp)"><i class="fas fa-edit"></i></button>
            <button class="btn-icon delete" (click)="deleteExp(exp._id)"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>

      <div class="empty-state" *ngIf="!isLoading && experiences.length === 0">
        <i class="fas fa-history"></i>
        <p>No experiences found. Click "Add Experience" to start building your timeline.</p>
      </div>
    </div>

    <!-- Experience Modal -->
    <div class="modal-overlay" *ngIf="showModal">
      <div class="modal-content card">
        <div class="card-header d-flex justify-between">
           <h3>{{ editingId ? 'Edit Experience' : 'Add Experience' }}</h3>
           <button class="btn-icon" (click)="closeModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="card-body">
          <form [formGroup]="expForm" (ngSubmit)="saveExperience()">
             <div class="form-row">
               <div class="form-group col">
                 <label>Title / Role</label>
                 <input type="text" formControlName="title" class="form-control" placeholder="Senior Engineer">
               </div>
               <div class="form-group col">
                 <label>Company / Institution</label>
                 <input type="text" formControlName="company" class="form-control" placeholder="Engineering Corp">
               </div>
             </div>
             
             <div class="form-row">
               <div class="form-group col">
                 <label>Type</label>
                 <select formControlName="type" class="form-control">
                   <option value="work">Work Experience</option>
                   <option value="education">Education</option>
                 </select>
               </div>
               <div class="form-group col">
                 <label>Location</label>
                 <input type="text" formControlName="location" class="form-control" placeholder="City, Country">
               </div>
             </div>

             <div class="form-row">
               <div class="form-group col">
                 <label>Start Date</label>
                 <input type="date" formControlName="startDate" class="form-control">
               </div>
               <div class="form-group col" *ngIf="!expForm.get('current')?.value">
                 <label>End Date</label>
                 <input type="date" formControlName="endDate" class="form-control">
               </div>
             </div>
             
             <div class="form-group">
               <label>
                 <input type="checkbox" formControlName="current"> I currently work here
               </label>
             </div>
             
             <div class="form-group">
               <label>Description</label>
               <textarea formControlName="description" class="form-control" rows="4"></textarea>
             </div>

             <div class="modal-actions">
               <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
               <button type="submit" class="btn btn-primary" [disabled]="expForm.invalid || isSaving">
                 {{ isSaving ? 'Saving...' : 'Save' }}
               </button>
             </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 30px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    
    .experience-list { display: flex; flex-direction: column; gap: 15px; }
    .exp-card { background: white; padding: 20px; border-radius: 12px; display: flex; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    
    .exp-icon { width: 50px; height: 50px; background: #ebf8ff; color: #3182ce; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-right: 20px; }
    .exp-info { flex: 1; }
    .exp-info h3 { margin: 0 0 5px 0; font-size: 17px; color: #1a202c; }
    .exp-info .company { display: block; color: #4a5568; font-weight: 500; font-size: 14px; }
    .exp-info .date { font-size: 13px; color: #a0aec0; }
    
    .exp-actions { display: flex; gap: 10px; }
    .btn-icon { background: #f7fafc; border: none; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; color: #4a5568; transition: 0.2s; }
    .btn-icon:hover { background: #edf2f7; color: #3182ce; }
    .btn-icon.delete:hover { color: #e53e3e; background: #fff5f5; }
    
    .btn { padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.2s; }
    .btn-primary { background: #3182ce; color: white; }
    .btn-primary:hover:not(:disabled) { background: #2b6cb0; }
    .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
    .btn-secondary { background: #e2e8f0; color: #4a5568; margin-right: 10px; }
    .btn-secondary:hover { background: #cbd5e0; }

    .alert-danger { background: #fed7d7; color: #822727; border: 1px solid #feb2b2; padding: 15px; border-radius: 6px; margin-bottom: 20px;}
    .loading-spinner { text-align: center; padding: 40px; color: #718096; font-size: 18px; }
    .empty-state { text-align: center; padding: 60px 20px; background: white; border-radius: 12px; border: 2px dashed #e2e8f0; color: #a0aec0;}
    .empty-state i { font-size: 48px; margin-bottom: 15px; color: #cbd5e0; }
    
    .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; background: white; border-radius: 12px; }
    .card-header { padding: 15px 20px; border-bottom: 1px solid #edf2f7; }
    .card-body { padding: 20px; }
    .d-flex { display: flex; }
    .justify-between { justify-content: space-between; align-items: center; }
    .card-header h3 { margin: 0; }
    
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; font-weight: 500; color: #4a5568; font-size: 14px;}
    .form-control { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; }
    .form-row { display: flex; gap: 15px; }
    .form-row .col { flex: 1; }
    .modal-actions { text-align: right; margin-top: 20px; }
  `]
})
export class ExperienceManagerComponent implements OnInit {
  experiences: any[] = [];
  isLoading = true;
  errorMessage = '';
  
  showModal = false;
  isSaving = false;
  expForm!: FormGroup;
  editingId: string | null = null;

  constructor(private fb: FormBuilder, private expService: ExperienceService) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchData();
  }
  
  initForm() {
    this.expForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      type: ['work', Validators.required],
      location: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      current: [false],
      description: ['']
    });
  }

  fetchData() {
    this.isLoading = true;
    this.expService.getExperiences().subscribe({
      next: (res) => {
        if (res.success) {
          this.experiences = res.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load experiences.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  openModal(exp?: any) {
    this.editingId = exp ? exp._id : null;
    if (exp) {
      this.expForm.patchValue({
        title: exp.title,
        company: exp.company,
        type: exp.type,
        location: exp.location,
        startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
        endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
        current: exp.current || false,
        description: exp.description
      });
    } else {
      this.expForm.reset({ type: 'work', current: false });
    }
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
    this.editingId = null;
  }
  
  saveExperience() {
    if (this.expForm.invalid) return;
    this.isSaving = true;
    
    const obs$ = this.editingId 
      ? this.expService.updateExperience(this.editingId, this.expForm.value)
      : this.expService.createExperience(this.expForm.value);
      
    obs$.subscribe({
      next: (res) => {
        if(res.success) {
          this.fetchData();
          this.closeModal();
        }
        this.isSaving = false;
      },
      error: (err) => {
        console.error(err);
        this.isSaving = false;
      }
    });
  }

  deleteExp(id: string) {
    if(confirm('Are you sure you want to delete this experience?')) {
      this.expService.deleteExperience(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.fetchData();
          }
        },
        error: (err) => console.error(err)
      });
    }
  }
}
