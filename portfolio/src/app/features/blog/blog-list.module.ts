import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';

@NgModule({
  declarations: [
    BlogListComponent
  ],
  imports: [
    CommonModule,
    RouterModule // Needed for [routerLink] inside BlogListComponent
  ],
  exports: [
    BlogListComponent
  ]
})
export class BlogListModule { }
