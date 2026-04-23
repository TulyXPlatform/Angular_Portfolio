import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { ProjectsModule } from '../projects/projects.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent
  ],
  imports: [
    CommonModule,
    ProjectsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
