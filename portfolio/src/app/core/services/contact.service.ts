import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { ContactData, Inquiry, ApiResponse } from '../models/domain.models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private api: BaseApiService) { }

  getContactData(): Observable<ApiResponse<ContactData>> {
    return this.api.get<ApiResponse<ContactData>>('/contact');
  }

  submitInquiry(data: Inquiry): Observable<ApiResponse<Inquiry>> {
    return this.api.post<ApiResponse<Inquiry>>('/inquiry', data);
  }

  getInquiries(): Observable<ApiResponse<Inquiry[]>> {
    return this.api.get<ApiResponse<Inquiry[]>>('/inquiry');
  }
}
