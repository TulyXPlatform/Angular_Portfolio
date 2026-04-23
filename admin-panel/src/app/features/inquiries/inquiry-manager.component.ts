import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inquiry-manager',
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>Project Inquiries</h1>
          <p>Review and respond to potential project leads.</p>
        </div>
      </div>

      <div class="card overflow-hidden">
        <table class="inquiry-table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Interest</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="user-cell">
                  <div class="avatar">JS</div>
                  <div class="user-info">
                    <span class="name">John Smith</span>
                    <span class="email">john@architech.com</span>
                  </div>
                </div>
              </td>
              <td>Commercial Tower Schematic</td>
              <td>Oct 12, 2026</td>
              <td><span class="badge badge-new">New</span></td>
              <td>
                <button class="btn-sm">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 30px; }
    .page-header { margin-bottom: 30px; }
    .title-section h1 { font-size: 24px; color: #1a202c; }
    
    .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .overflow-hidden { overflow: hidden; }
    
    .inquiry-table { width: 100%; border-collapse: collapse; text-align: left; }
    .inquiry-table th { background: #f7fafc; padding: 15px 20px; font-size: 13px; font-weight: 600; color: #718096; text-transform: uppercase; }
    .inquiry-table td { padding: 15px 20px; border-bottom: 1px solid #edf2f7; }
    
    .user-cell { display: flex; align-items: center; gap: 12px; }
    .avatar { width: 36px; height: 36px; background: #edf2f7; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #3182ce; font-size: 14px; }
    .user-info { display: flex; flex-direction: column; }
    .user-info .name { font-weight: 600; color: #2d3748; }
    .user-info .email { font-size: 13px; color: #a0aec0; }
    
    .badge { padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
    .badge-new { background: #fff5f5; color: #e53e3e; }
    
    .btn-sm { padding: 6px 12px; font-size: 13px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; transition: 0.2s; }
    .btn-sm:hover { background: #f7fafc; border-color: #cbd5e0; }
  `]
})
export class InquiryManagerComponent implements OnInit {
  ngOnInit(): void {}
}
