import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-manager',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>Contact Information</h1>
          <p>Update your public contact details and office location.</p>
        </div>
        <button class="btn btn-primary">Update Info</button>
      </div>

      <div class="grid-layout">
        <div class="card">
          <div class="card-header">Communication Channels</div>
          <div class="card-body">
            <div class="form-group">
              <label>Professional Email</label>
              <input type="email" class="form-control" value="engineer@tulyx.platform">
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="text" class="form-control" value="+1 (555) 010-9988">
            </div>
            <div class="form-group">
              <label>Office Address</label>
              <textarea class="form-control" rows="3">Sector 7, Engineering District, Cloud City</textarea>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">Map Integration</div>
          <div class="card-body">
            <div class="form-group">
              <label>Google Maps Embed URL</label>
              <input type="text" class="form-control">
            </div>
            <div class="map-preview">
              <div class="placeholder-map">
                 <i class="fas fa-map-marked-alt"></i>
                 <span>Map Preview Area</span>
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
    
    .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
    .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .card-header { padding: 15px 20px; font-weight: 600; border-bottom: 1px solid #edf2f7; }
    .card-body { padding: 20px; }
    
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 500; color: #4a5568; }
    .form-control { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; }
    
    .placeholder-map { height: 200px; background: #f7fafc; border-radius: 8px; border: 2px dashed #e2e8f0; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #a0aec0; }
    .placeholder-map i { font-size: 32px; margin-bottom: 10px; }
    
    .btn-primary { background: #3182ce; color: white; padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; }
  `]
})
export class ContactManagerComponent implements OnInit {
  ngOnInit(): void {}
}
