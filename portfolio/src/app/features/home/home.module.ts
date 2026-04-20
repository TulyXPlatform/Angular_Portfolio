import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Component should be generated and imported here
// import { HomeComponent } from './home.component';

const routes: Routes = [
  // { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    // HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
