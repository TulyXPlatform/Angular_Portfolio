import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { Settings, ApiResponse } from '../models/domain.models';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private endpoint = '/settings';

  constructor(private api: BaseApiService) { }

  getSettings(): Observable<ApiResponse<Settings>> {
    return this.api.get<ApiResponse<Settings>>(this.endpoint);
  }

  updateSettings(data: Settings): Observable<ApiResponse<Settings>> {
    return this.api.put<ApiResponse<Settings>>(this.endpoint, data);
  }
}
