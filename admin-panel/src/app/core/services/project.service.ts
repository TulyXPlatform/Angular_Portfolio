import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private endpoint = '/projects';

  constructor(private api: BaseApiService) { }

  getProjects(): Observable<any> {
    return this.api.get(this.endpoint);
  }

  getProjectById(id: string): Observable<any> {
    return this.api.get(`${this.endpoint}/${id}`);
  }

  createProject(data: any): Observable<any> {
    return this.api.post(this.endpoint, data);
  }

  updateProject(id: string, data: any): Observable<any> {
    return this.api.put(`${this.endpoint}/${id}`, data);
  }

  deleteProject(id: string): Observable<any> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
