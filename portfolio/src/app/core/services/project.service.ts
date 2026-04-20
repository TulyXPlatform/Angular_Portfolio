import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { Project, ApiResponse } from '../models/domain.models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private endpoint = '/projects';

  constructor(private api: BaseApiService) { }

  getProjects(): Observable<ApiResponse<Project[]>> {
    return this.api.get<ApiResponse<Project[]>>(this.endpoint);
  }

  getProjectBySlug(slug: string): Observable<ApiResponse<Project>> {
    return this.api.get<ApiResponse<Project>>(`${this.endpoint}/${slug}`);
  }

  createProject(data: Project): Observable<ApiResponse<Project>> {
    return this.api.post<ApiResponse<Project>>(this.endpoint, data);
  }

  updateProject(id: string, data: Project): Observable<ApiResponse<Project>> {
    return this.api.put<ApiResponse<Project>>(`${this.endpoint}/${id}`, data);
  }

  deleteProject(id: string): Observable<ApiResponse<{}>> {
    return this.api.delete<ApiResponse<{}>>(`${this.endpoint}/${id}`);
  }
}
