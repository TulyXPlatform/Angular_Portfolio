import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaViewerComponent } from './components/media-viewer/media-viewer.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    MediaViewerComponent,
    SafePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    MediaViewerComponent,
    SafePipe
  ]
})
export class SharedModule { }

