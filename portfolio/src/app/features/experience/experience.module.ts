import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExperienceComponent } from './experience.component';

const routes: Routes = [
  { path: '', component: ExperienceComponent }
];

@NgModule({
  declarations: [
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ExperienceModule { }
