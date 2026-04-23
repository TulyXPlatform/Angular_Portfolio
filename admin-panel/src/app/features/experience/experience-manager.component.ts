import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-manager',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>Career Timeline</h1>
          <p>Manage your professional experience and academic background.</p>
        </div>
        <button class="btn btn-primary"><i class="fas fa-plus"></i> Add Experience</button>
      </div>

      <div class="experience-list">
        <div class="exp-card">
          <div class="exp-icon"><i class="fas fa-briefcase"></i></div>
          <div class="exp-info">
            <h3>Senior Structural Designer</h3>
            <span class="company">Global Infra Corp</span>
            <span class="date">2020 - Present</span>
          </div>
          <div class="exp-actions">
            <button class="btn-icon"><i class="fas fa-edit"></i></button>
            <button class="btn-icon delete"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        
        <div class="exp-card">
          <div class="exp-icon"><i class="fas fa-graduation-cap"></i></div>
          <div class="exp-info">
            <h3>B.Sc. in Civil Engineering</h3>
            <span class="company">Technical University</span>
            <span class="date">2013 - 2017</span>
          </div>
          <div class="exp-actions">
            <button class="btn-icon"><i class="fas fa-edit"></i></button>
            <button class="btn-icon delete"><i class="fas fa-trash"></i></button>
          </div>
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
    
    .btn-primary { background: #3182ce; color: white; padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; }
  `]
})
export class ExperienceManagerComponent implements OnInit {
  ngOnInit(): void {}
}
