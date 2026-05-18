import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsListModule } from './projects-list.module';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: ':slug', component: ProjectDetailsComponent }
];

@NgModule({
  declarations: [
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsListModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectsModule { }

