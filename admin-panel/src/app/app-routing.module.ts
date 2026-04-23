import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProjectManagerComponent } from './features/projects/project-manager.component';
import { SettingsManagerComponent } from './features/settings/settings-manager.component';
import { HeroManagerComponent } from './features/hero/hero-manager.component';
import { AboutManagerComponent } from './features/about/about-manager.component';
import { ExperienceManagerComponent } from './features/experience/experience-manager.component';
import { BlogManagerComponent } from './features/blog/blog-manager.component';
import { InquiryManagerComponent } from './features/inquiries/inquiry-manager.component';
import { ContactManagerComponent } from './features/contact/contact-manager.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { 
    path: '', 
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: ProjectManagerComponent },
      { path: 'hero', component: HeroManagerComponent },
      { path: 'about', component: AboutManagerComponent },
      { path: 'projects', component: ProjectManagerComponent },
      { path: 'experience', component: ExperienceManagerComponent },
      { path: 'blog', component: BlogManagerComponent },
      { path: 'inquiries', component: InquiryManagerComponent },
      { path: 'contact', component: ContactManagerComponent },
      { path: 'settings', component: SettingsManagerComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
