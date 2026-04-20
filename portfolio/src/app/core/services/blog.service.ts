import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { Blog, ApiResponse } from '../models/domain.models';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private endpoint = '/blog';

  constructor(private api: BaseApiService) { }

  getBlogs(): Observable<ApiResponse<Blog[]>> {
    return this.api.get<ApiResponse<Blog[]>>(this.endpoint);
  }

  getBlogBySlug(slug: string): Observable<ApiResponse<Blog>> {
    return this.api.get<ApiResponse<Blog>>(`${this.endpoint}/${slug}`);
  }

  createBlog(data: Blog): Observable<ApiResponse<Blog>> {
    return this.api.post<ApiResponse<Blog>>(this.endpoint, data);
  }

  updateBlog(id: string, data: Blog): Observable<ApiResponse<Blog>> {
    return this.api.put<ApiResponse<Blog>>(`${this.endpoint}/${id}`, data);
  }

  deleteBlog(id: string): Observable<ApiResponse<{}>> {
    return this.api.delete<ApiResponse<{}>>(`${this.endpoint}/${id}`);
  }
}
