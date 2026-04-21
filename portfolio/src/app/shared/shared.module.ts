import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaViewerComponent } from './components/media-viewer/media-viewer.component';

@NgModule({
  declarations: [
    MediaViewerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    MediaViewerComponent
  ]
})
export class SharedModule { }

