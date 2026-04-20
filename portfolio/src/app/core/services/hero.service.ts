import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { Hero, ApiResponse } from '../models/domain.models';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private endpoint = '/hero';

  constructor(private api: BaseApiService) { }

  getHero(): Observable<ApiResponse<Hero>> {
    return this.api.get<ApiResponse<Hero>>(this.endpoint);
  }
}
