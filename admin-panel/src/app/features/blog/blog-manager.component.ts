import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-blog-manager',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>Articles & Insights</h1>
          <p>Share your technical knowledge and project updates.</p>
        </div>
        <button class="btn btn-primary" (click)="openModal()"><i class="fas fa-pen"></i> New Article</button>
      </div>

      <div class="alert alert-danger" *ngIf="errorMessage">{{ errorMessage }}</div>

      <div class="loading-spinner" *ngIf="isLoading">
        <i class="fas fa-circle-notch fa-spin"></i> Loading articles...
      </div>

      <div class="blog-grid" *ngIf="!isLoading && blogs.length > 0">
        <div class="blog-card" *ngFor="let blog of blogs">
          <div class="blog-thumb" [style.backgroundImage]="'url(' + (blog.coverImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80') + ')'"></div>
          <div class="blog-content">
            <span class="category">{{ blog.category || 'Technical' }}</span>
            <h3>{{ blog.title }}</h3>
            <p class="excerpt">{{ blog.excerpt || (blog.content | slice:0:100) }}...</p>
            <div class="blog-footer">
              <span class="status" [class.published]="blog.isPublished">{{ blog.isPublished ? 'Published' : 'Draft' }}</span>
              <div class="actions">
                <button class="btn-icon" (click)="openModal(blog)"><i class="fas fa-edit"></i></button>
                <button class="btn-icon delete" (click)="deleteBlog(blog._id)"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-state" *ngIf="!isLoading && blogs.length === 0">
        <i class="fas fa-newspaper"></i>
        <p>No articles found. Create your first insight post.</p>
      </div>
    </div>

    <!-- Blog Modal -->
    <div class="modal-overlay" *ngIf="showModal">
      <div class="modal-content card">
        <div class="card-header d-flex justify-between">
           <h3>{{ editingId ? 'Edit Article' : 'New Article' }}</h3>
           <button class="btn-icon" (click)="closeModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="card-body">
          <form [formGroup]="blogForm" (ngSubmit)="saveBlog()">
             <div class="form-group">
               <label>Article Title</label>
               <input type="text" formControlName="title" class="form-control" placeholder="Enter title...">
             </div>
             
             <div class="form-row">
               <div class="form-group col">
                 <label>Category</label>
                 <input type="text" formControlName="category" class="form-control" placeholder="e.g. Structural, Geotech">
               </div>
               <div class="form-group col">
                 <label>Cover Image URL</label>
                 <input type="text" formControlName="coverImage" class="form-control" placeholder="https://...">
               </div>
             </div>

             <div class="form-group">
               <label>Excerpt (Short Description)</label>
               <textarea formControlName="excerpt" class="form-control" rows="2"></textarea>
             </div>
             
             <div class="form-group">
               <label>Content</label>
               <textarea formControlName="content" class="form-control" rows="8" placeholder="Write your article here..."></textarea>
             </div>
             
             <div class="form-group">
               <label>
                 <input type="checkbox" formControlName="isPublished"> Publish this article
               </label>
             </div>

             <div class="modal-actions">
               <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
               <button type="submit" class="btn btn-primary" [disabled]="blogForm.invalid || isSaving">
                 {{ isSaving ? 'Saving...' : 'Save Article' }}
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
    
    .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 25px; }
    .blog-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .blog-thumb { height: 180px; background-size: cover; background-position: center; }
    .blog-content { padding: 20px; }
    
    .category { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #3182ce; background: #ebf8ff; padding: 4px 8px; border-radius: 4px; }
    .blog-content h3 { margin: 15px 0 10px 0; font-size: 18px; color: #1a202c; line-height: 1.4; }
    .excerpt { font-size: 14px; color: #718096; line-height: 1.6; margin-bottom: 20px; min-height: 45px; }
    
    .blog-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid #edf2f7; }
    .status { font-size: 12px; font-weight: 600; color: #718096; }
    .status.published { color: #38a169; }
    
    .actions { display: flex; gap: 8px; }
    .btn-icon { background: #f7fafc; border: none; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; color: #4a5568; transition: 0.2s;}
    .btn-icon:hover { background: #edf2f7; color: #3182ce; }
    .btn-icon.delete:hover { color: #e53e3e; background: #fff5f5; }
    
    .btn { padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.2s;}
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
    .modal-content { width: 100%; max-width: 700px; max-height: 90vh; overflow-y: auto; background: white; border-radius: 12px; }
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
export class BlogManagerComponent implements OnInit {
  blogs: any[] = [];
  isLoading = true;
  errorMessage = '';

  showModal = false;
  isSaving = false;
  blogForm!: FormGroup;
  editingId: string | null = null;

  constructor(private fb: FormBuilder, private blogService: BlogService) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchData();
  }
  
  initForm() {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      category: [''],
      coverImage: [''],
      excerpt: [''],
      content: ['', Validators.required],
      isPublished: [true]
    });
  }

  fetchData() {
    this.isLoading = true;
    this.blogService.getBlogs().subscribe({
      next: (res) => {
        if (res.success) {
          this.blogs = res.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load blogs.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  openModal(blog?: any) {
    this.editingId = blog ? blog._id : null;
    if (blog) {
      this.blogForm.patchValue({
        title: blog.title,
        category: blog.category,
        coverImage: blog.coverImage,
        excerpt: blog.excerpt,
        content: blog.content,
        isPublished: blog.isPublished !== undefined ? blog.isPublished : true
      });
    } else {
      this.blogForm.reset({ isPublished: true });
    }
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
    this.editingId = null;
  }
  
  saveBlog() {
    if (this.blogForm.invalid) return;
    this.isSaving = true;
    
    const obs$ = this.editingId 
      ? this.blogService.updateBlog(this.editingId, this.blogForm.value)
      : this.blogService.createBlog(this.blogForm.value);
      
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

  deleteBlog(id: string) {
    if(confirm('Are you sure you want to delete this article?')) {
      this.blogService.deleteBlog(id).subscribe({
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
