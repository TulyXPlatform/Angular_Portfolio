import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { Experience, ApiResponse } from '../models/domain.models';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private endpoint = '/experience';

  constructor(private api: BaseApiService) { }

  getExperience(): Observable<ApiResponse<Experience[]>> {
    return this.api.get<ApiResponse<Experience[]>>(this.endpoint);
  }

  createExperience(data: Experience): Observable<ApiResponse<Experience>> {
    return this.api.post<ApiResponse<Experience>>(this.endpoint, data);
  }

  updateExperience(id: string, data: Experience): Observable<ApiResponse<Experience>> {
    return this.api.put<ApiResponse<Experience>>(`${this.endpoint}/${id}`, data);
  }

  deleteExperience(id: string): Observable<ApiResponse<{}>> {
    return this.api.delete<ApiResponse<{}>>(`${this.endpoint}/${id}`);
  }
}
