import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-window-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './window-manager.html',
  styleUrls: ['./window-manager.css']
})
export class WindowManager {

  @Input() title = 'Window';
  @Input() icon = '🪟';
  @Input() zIndex = 700;

  @Output() closeWindow = new EventEmitter<void>();
  @Output() focusWindow = new EventEmitter<void>();

  focus() {
    this.focusWindow.emit();
  }

  x = 360;
  y = 120;

  width = 820;
  height = 340;

  isDragging = false;
  offsetX = 0;
  offsetY = 0;

  isResizing = false;
  resizeStartX = 0;
  resizeStartY = 0;
  startWidth = 0;
  startHeight = 0;

  isMaximized = false;

  startDrag(event: MouseEvent) {
    if (this.isMaximized) return;

    this.isDragging = true;
    this.offsetX = event.clientX - this.x;
    this.offsetY = event.clientY - this.y;

    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);
  }

  onDrag = (event: MouseEvent) => {
    if (!this.isDragging) return;

    this.x = event.clientX - this.offsetX;
    this.y = event.clientY - this.offsetY;
  };

  stopDrag = () => {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
  };

  startResize(event: MouseEvent) {
    event.stopPropagation();
    if (this.isMaximized) return;

    this.isResizing = true;
    this.resizeStartX = event.clientX;
    this.resizeStartY = event.clientY;
    this.startWidth = this.width;
    this.startHeight = this.height;

    document.addEventListener('mousemove', this.onResize);
    document.addEventListener('mouseup', this.stopResize);
  }

  onResize = (event: MouseEvent) => {
    if (!this.isResizing) return;

    this.width = Math.max(420, this.startWidth + event.clientX - this.resizeStartX);
    this.height = Math.max(260, this.startHeight + event.clientY - this.resizeStartY);
  };

  stopResize = () => {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.onResize);
    document.removeEventListener('mouseup', this.stopResize);
  };

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
  }

  close() {
    this.closeWindow.emit();
  }
}