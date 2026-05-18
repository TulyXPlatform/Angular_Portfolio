import { Component, OnInit } from '@angular/core';
import { InquiryService } from '../../core/services/inquiry.service';

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

      <div class="alert alert-danger" *ngIf="errorMessage">{{ errorMessage }}</div>

      <div class="loading-spinner" *ngIf="isLoading">
        <i class="fas fa-circle-notch fa-spin"></i> Loading inquiries...
      </div>

      <div class="card overflow-hidden" *ngIf="!isLoading && inquiries.length > 0">
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
            <tr *ngFor="let inquiry of inquiries" [class.unread]="!inquiry.read">
              <td>
                <div class="user-cell">
                  <div class="avatar">{{ getInitials(inquiry.name) }}</div>
                  <div class="user-info">
                    <span class="name">{{ inquiry.name }}</span>
                    <span class="email">{{ inquiry.email }}</span>
                  </div>
                </div>
              </td>
              <td>{{ inquiry.subject }}</td>
              <td>{{ inquiry.createdAt | date:'mediumDate' }}</td>
              <td>
                <span class="badge" [class.badge-new]="!inquiry.read" [class.badge-read]="inquiry.read">
                  {{ inquiry.read ? 'Read' : 'New' }}
                </span>
              </td>
              <td>
                <button class="btn-sm" (click)="viewDetails(inquiry)">View Details</button>
                <button class="btn-sm btn-delete" (click)="deleteInquiry(inquiry._id)"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="empty-state" *ngIf="!isLoading && inquiries.length === 0">
        <i class="fas fa-inbox"></i>
        <p>No new inquiries. You're all caught up!</p>
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
    .inquiry-table tr.unread { background: #ebf8ff; }
    
    .user-cell { display: flex; align-items: center; gap: 12px; }
    .avatar { width: 36px; height: 36px; background: #edf2f7; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #3182ce; font-size: 14px; }
    .user-info { display: flex; flex-direction: column; }
    .user-info .name { font-weight: 600; color: #2d3748; }
    .user-info .email { font-size: 13px; color: #a0aec0; }
    
    .badge { padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
    .badge-new { background: #fff5f5; color: #e53e3e; }
    .badge-read { background: #edf2f7; color: #4a5568; }
    
    .btn-sm { padding: 6px 12px; font-size: 13px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; transition: 0.2s; margin-right: 5px; }
    .btn-sm:hover { background: #f7fafc; border-color: #cbd5e0; }
    .btn-delete { color: #e53e3e; border-color: #feb2b2; }
    .btn-delete:hover { background: #fff5f5; border-color: #fc8181; }

    .alert-danger { background: #fed7d7; color: #822727; border: 1px solid #feb2b2; padding: 15px; border-radius: 6px; margin-bottom: 20px;}
    .loading-spinner { text-align: center; padding: 40px; color: #718096; font-size: 18px; }
    .empty-state { text-align: center; padding: 60px 20px; background: white; border-radius: 12px; border: 2px dashed #e2e8f0; color: #a0aec0;}
    .empty-state i { font-size: 48px; margin-bottom: 15px; color: #cbd5e0; }
  `]
})
export class InquiryManagerComponent implements OnInit {
  inquiries: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private inquiryService: InquiryService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.inquiryService.getInquiries().subscribe({
      next: (res) => {
        if (res.success) {
          this.inquiries = res.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load inquiries.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  viewDetails(inquiry: any) {
    if (!inquiry.read) {
      this.inquiryService.markAsRead(inquiry._id).subscribe({
        next: () => {
          inquiry.read = true;
        }
      });
    }
    // Implement modal for viewing details
    console.log('Viewing inquiry details:', inquiry);
    alert(`From: ${inquiry.name}\nMessage: ${inquiry.message}`);
  }

  deleteInquiry(id: string) {
    if(confirm('Are you sure you want to delete this inquiry?')) {
      this.inquiryService.deleteInquiry(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.fetchData();
          }
        },
        error: (err) => console.error(err)
      });
    }
  }

  getInitials(name: string): string {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }
}
