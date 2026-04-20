import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['./media-viewer.component.css']
})
export class MediaViewerComponent {
  @Input() mediaList: any[] = [];
  @Input() currentIndex: number = 0;
  
  isOpen = false;
  zoomLevel = 1;
  panX = 0;
  panY = 0;
  isDragging = false;
  startX = 0;
  startY = 0;
  isFullscreen = false;

  open(index: number) {
    this.currentIndex = index;
    this.isOpen = true;
    this.resetTransforms();
  }

  close() {
    this.isOpen = false;
    this.resetTransforms();
    if (this.isFullscreen) {
      document.exitFullscreen();
      this.isFullscreen = false;
    }
  }

  get currentMedia() {
    return this.mediaList[this.currentIndex];
  }

  next() {
    if (this.currentIndex < this.mediaList.length - 1) {
      this.currentIndex++;
      this.resetTransforms();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.resetTransforms();
    }
  }

  zoomIn() {
    this.zoomLevel = Math.min(this.zoomLevel + 0.25, 3);
  }

  zoomOut() {
    this.zoomLevel = Math.max(this.zoomLevel - 0.25, 0.5);
  }

  resetTransforms() {
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
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

  // Pan events
  onMouseDown(event: MouseEvent) {
    if (this.zoomLevel > 1) {
      this.isDragging = true;
      this.startX = event.clientX - this.panX;
      this.startY = event.clientY - this.panY;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.panX = event.clientX - this.startX;
      this.panY = event.clientY - this.startY;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.isOpen) return;
    if (event.key === 'Escape') this.close();
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
  }
}
