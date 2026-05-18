import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { ProjectsListModule } from '../projects/projects-list.module';
import { AboutModule } from '../about/about.module';
import { ExperienceModule } from '../experience/experience.module';
import { ContactModule } from '../contact/contact.module';

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
    ProjectsListModule,
    AboutModule,
    ExperienceModule,
    ContactModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
