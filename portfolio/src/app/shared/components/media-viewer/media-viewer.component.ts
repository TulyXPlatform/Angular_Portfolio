import { Component, Input, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import Panzoom, { PanzoomObject } from '@panzoom/panzoom';

@Component({
  selector: 'app-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['./media-viewer.component.scss']
})
export class MediaViewerComponent implements AfterViewChecked, OnDestroy {
  @Input() mediaList: any[] = [];
  @Input() currentIndex: number = 0;
  
  isOpen = false;
  isFullscreen = false;
  private panzoomInstance: PanzoomObject | null = null;
  @ViewChild('transformContainer') transformContainer!: ElementRef;

  open(index: number) {
    this.currentIndex = index;
    this.isOpen = true;
    this.resetPanZoom();
  }

  close() {
    this.isOpen = false;
    this.destroyPanzoom();
    if (this.isFullscreen && document.fullscreenElement) {
      document.exitFullscreen().catch(()=>{});
      this.isFullscreen = false;
    }
  }

  get currentMedia() {
    return this.mediaList ? this.mediaList[this.currentIndex] : null;
  }

  setIndex(index: number) {
    if (this.currentIndex !== index) {
      this.currentIndex = index;
      this.resetPanZoom();
    }
  }

  next() {
    if (this.currentIndex < this.mediaList.length - 1) {
      this.currentIndex++;
      this.resetPanZoom();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.resetPanZoom();
    }
  }

  // Panzoom Library Wrapper Engine
  ngAfterViewChecked() {
    if (this.isOpen && this.transformContainer && !this.panzoomInstance && this.currentMedia?.type === 'image') {
      this.initPanzoom();
    }
  }

  private initPanzoom() {
    this.panzoomInstance = Panzoom(this.transformContainer.nativeElement, {
      maxScale: 5,
      canvas: true,
      contain: 'outside',
      cursor: 'grab'
    });
    
    // Smooth scroll zooming
    this.transformContainer.nativeElement.parentElement.addEventListener('wheel', this.panzoomInstance.zoomWithWheel);
  }

  private destroyPanzoom() {
    if (this.panzoomInstance) {
      this.transformContainer?.nativeElement?.parentElement?.removeEventListener('wheel', this.panzoomInstance.zoomWithWheel);
      this.panzoomInstance.destroy();
      this.panzoomInstance = null;
    }
  }

  private resetPanZoom() {
    this.destroyPanzoom();
    // After structural changes *ngIf updates DOM. ngAfterViewChecked re-inits implicitly.
  }

  zoomIn() {
    if (this.panzoomInstance) this.panzoomInstance.zoomIn();
  }

  zoomOut() {
    if (this.panzoomInstance) this.panzoomInstance.zoomOut();
  }

  resetTransforms() {
    if (this.panzoomInstance) this.panzoomInstance.reset();
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.isFullscreen = false;
      }
    }
  }

  ngOnDestroy() {
    this.destroyPanzoom();
  }
}
