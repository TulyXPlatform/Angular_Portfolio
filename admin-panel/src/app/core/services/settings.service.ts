import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private api: BaseApiService) {}
  
  getSettings(): Observable<any> {
    return this.api.get<any>('/settings');
  }
  
  updateSettings(data: any): Observable<any> {
    return this.api.put<any>('/settings', data);
  }
}
