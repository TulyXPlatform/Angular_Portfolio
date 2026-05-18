import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeroService {
  constructor(private api: BaseApiService) {}
  
  getHeroData(): Observable<any> {
    return this.api.get<any>('/hero');
  }
  
  updateHeroData(data: any): Observable<any> {
    return this.api.put<any>('/hero', data);
  }
}
