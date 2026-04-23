import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: ':slug', component: ProjectDetailsComponent }
];

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }

