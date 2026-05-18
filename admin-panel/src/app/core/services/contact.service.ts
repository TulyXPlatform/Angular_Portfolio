import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private api: BaseApiService) {}
  
  getContactData(): Observable<any> {
    return this.api.get<any>('/contact');
  }
  
  updateContactData(data: any): Observable<any> {
    return this.api.put<any>('/contact', data);
  }
}
