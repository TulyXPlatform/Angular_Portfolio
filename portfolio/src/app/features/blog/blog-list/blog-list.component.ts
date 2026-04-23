import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../core/services/blog.service';
import { Blog, ApiResponse } from '../../../core/models/domain.models';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  isLoading = true;
  
  // Pagination State
  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((res: ApiResponse<Blog[]>) => {
      if (res.success && res.data) {
        this.blogs = res.data;
        this.totalPages = Math.ceil(this.blogs.length / this.pageSize);
      }
      this.isLoading = false;
    });
  }

  get paginatedBlogs() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.blogs.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  setPage(page: number) {
    this.currentPage = page;
  }
}
