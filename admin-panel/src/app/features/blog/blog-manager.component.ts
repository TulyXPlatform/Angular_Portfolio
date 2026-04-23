import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-manager',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>Articles & Insights</h1>
          <p>Share your technical knowledge and project updates.</p>
        </div>
        <button class="btn btn-primary"><i class="fas fa-pen"></i> New Article</button>
      </div>

      <div class="blog-grid">
        <div class="blog-card">
          <div class="blog-thumb" style="background-image: url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80')"></div>
          <div class="blog-content">
            <span class="category">Technical</span>
            <h3>Seismic Resilience in Steel Structures</h3>
            <p class="excerpt">A deep dive into modern damping systems for high-rise steel buildings...</p>
            <div class="blog-footer">
              <span class="status published">Published</span>
              <div class="actions">
                <button class="btn-icon"><i class="fas fa-edit"></i></button>
                <button class="btn-icon delete"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
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
    .excerpt { font-size: 14px; color: #718096; line-height: 1.6; margin-bottom: 20px; }
    
    .blog-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid #edf2f7; }
    .status { font-size: 12px; font-weight: 600; }
    .status.published { color: #38a169; }
    
    .actions { display: flex; gap: 8px; }
    .btn-icon { background: #f7fafc; border: none; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; color: #4a5568; }
    .btn-primary { background: #3182ce; color: white; padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; }
  `]
})
export class BlogManagerComponent implements OnInit {
  ngOnInit(): void {}
}
