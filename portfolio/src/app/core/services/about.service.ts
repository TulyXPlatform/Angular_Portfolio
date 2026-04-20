import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { About, ApiResponse } from '../models/domain.models';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private endpoint = '/about';

  constructor(private api: BaseApiService) { }

  getAbout(): Observable<ApiResponse<About>> {
    return this.api.get<ApiResponse<About>>(this.endpoint);
  }
}
