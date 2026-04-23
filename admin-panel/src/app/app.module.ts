import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ProjectManagerComponent } from './features/projects/project-manager.component';
import { SettingsManagerComponent } from './features/settings/settings-manager.component';
import { HeroManagerComponent } from './features/hero/hero-manager.component';
import { AboutManagerComponent } from './features/about/about-manager.component';
import { ExperienceManagerComponent } from './features/experience/experience-manager.component';
import { BlogManagerComponent } from './features/blog/blog-manager.component';
import { InquiryManagerComponent } from './features/inquiries/inquiry-manager.component';
import { ContactManagerComponent } from './features/contact/contact-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    ProjectManagerComponent,
    SettingsManagerComponent,
    HeroManagerComponent,
    AboutManagerComponent,
    ExperienceManagerComponent,
    BlogManagerComponent,
    InquiryManagerComponent,
    ContactManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
