import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutWrapperComponent } from './layout-wrapper/layout-wrapper.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutWrapperComponent
  ]
})
export class LayoutModule { }
