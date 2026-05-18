import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  constructor(private api: BaseApiService) {}
  
  getExperiences(): Observable<any> {
    return this.api.get<any>('/experience');
  }
  
  createExperience(data: any): Observable<any> {
    return this.api.post<any>('/experience', data);
  }

  updateExperience(id: string, data: any): Observable<any> {
    return this.api.put<any>(`/experience/${id}`, data);
  }

  deleteExperience(id: string): Observable<any> {
    return this.api.delete<any>(`/experience/${id}`);
  }
}
