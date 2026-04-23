import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-manager',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>About Section</h1>
          <p>Tell your story and highlight your professional skills.</p>
        </div>
        <button class="btn btn-primary">Save Profile</button>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <label>Professional Bio</label>
            <textarea class="form-control" rows="6" placeholder="Describe your experience and engineering philosophy..."></textarea>
          </div>
          
          <div class="form-row">
             <div class="form-group col">
               <label>Core Skills (comma separated)</label>
               <input type="text" class="form-control" placeholder="Structural Analysis, BIM, Revit...">
             </div>
             <div class="form-group col">
               <label>Preferred Tools</label>
               <input type="text" class="form-control" placeholder="AutoCAD, SAP2000, Python...">
             </div>
          </div>

          <div class="form-group">
            <label>Resume / CV Link</label>
            <div class="input-with-icon">
              <i class="fas fa-link"></i>
              <input type="text" class="form-control" placeholder="https://drive.google.com/...">
            </div>
          </div>
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

    .btn-primary { background: #3182ce; color: white; padding: 12px 24px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; }
    .form-row { display: flex; gap: 20px; }
    .col { flex: 1; }
  `]
})
export class AboutManagerComponent implements OnInit {
  ngOnInit(): void {}
}
