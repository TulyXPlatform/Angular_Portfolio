import { Component, OnInit } from '@angular/core';

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
          <button class="btn btn-primary">Save Changes</button>
        </div>
      </div>

      <div class="grid-container">
        <div class="card main-card">
          <div class="card-header">Hero Details</div>
          <div class="card-body">
            <div class="form-group">
              <label>Main Title</label>
              <input type="text" class="form-control" placeholder="e.g. PRECISION_ENGINEERING.EXE">
            </div>
            <div class="form-group">
              <label>Subtitle / Slogan</label>
              <textarea class="form-control" rows="3"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group col">
                <label>Overlay Opacity</label>
                <input type="range" min="0" max="1" step="0.1">
              </div>
              <div class="form-group col">
                <label>Theme Accent</label>
                <input type="color">
              </div>
            </div>
          </div>
        </div>

        <div class="card side-card">
          <div class="card-header">Media & CTA</div>
          <div class="card-body">
             <div class="media-preview">
               <div class="placeholder-box">
                 <i class="fas fa-image"></i>
                 <span>No background selected</span>
               </div>
               <button class="btn btn-sm btn-outline">Upload Media</button>
             </div>
             <hr>
             <div class="cta-section">
               <label>Call to Action Buttons</label>
               <div class="cta-item">
                 <input type="text" placeholder="Label">
                 <input type="text" placeholder="Link">
               </div>
               <button class="btn btn-link">+ Add Button</button>
             </div>
          </div>
        </div>
      </div>
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
    .form-group label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #4a5568; }
    .form-control { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; }
    
    .btn { padding: 10px 20px; border-radius: 6px; font-weight: 500; cursor: pointer; transition: 0.2s; border: none; }
    .btn-primary { background: #3182ce; color: white; }
    .btn-primary:hover { background: #2b6cb0; }
    .btn-outline { border: 1px solid #3182ce; color: #3182ce; background: transparent; }
    
    .media-preview { text-align: center; }
    .placeholder-box { height: 150px; background: #f7fafc; border: 2px dashed #e2e8f0; border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-bottom: 15px; color: #a0aec0; }
    .placeholder-box i { font-size: 32px; margin-bottom: 10px; }
  `]
})
export class HeroManagerComponent implements OnInit {
  ngOnInit(): void {}
}
