import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InquiryService {
  constructor(private api: BaseApiService) {}
  
  getInquiries(): Observable<any> {
    return this.api.get<any>('/inquiry');
  }
  
  markAsRead(id: string): Observable<any> {
    return this.api.put<any>(`/inquiry/${id}/read`, {});
  }

  deleteInquiry(id: string): Observable<any> {
    return this.api.delete<any>(`/inquiry/${id}`);
  }
}
