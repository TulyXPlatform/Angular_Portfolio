import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AboutService {
  constructor(private api: BaseApiService) {}
  
  getAboutData(): Observable<any> {
    return this.api.get<any>('/about');
  }
  
  updateAboutData(data: any): Observable<any> {
    return this.api.put<any>('/about', data);
  }
}
