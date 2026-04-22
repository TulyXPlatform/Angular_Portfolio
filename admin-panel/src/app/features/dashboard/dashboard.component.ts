import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>You are logged in as admin.</p>
      <button (click)="logout()">Logout</button>
    </div>
  `,
  styles: [`
    .dashboard { padding: 2rem; }
    h1 { color: #333; }
    button { padding: 0.5rem 1rem; cursor: pointer; }
  `]
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
