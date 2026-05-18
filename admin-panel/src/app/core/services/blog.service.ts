import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private api: BaseApiService) {}
  
  getBlogs(): Observable<any> {
    return this.api.get<any>('/blog');
  }
  
  createBlog(data: any): Observable<any> {
    return this.api.post<any>('/blog', data);
  }

  updateBlog(id: string, data: any): Observable<any> {
    return this.api.put<any>(`/blog/${id}`, data);
  }

  deleteBlog(id: string): Observable<any> {
    return this.api.delete<any>(`/blog/${id}`);
  }
}
