import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({

selector:'app-window-manager',

standalone:true,

imports:[CommonModule],

templateUrl:'./window-manager.html',

styleUrls:['./window-manager.css']

})
export class WindowManager implements OnInit {

  isClosing = false;

ngOnInit(){

  this.width = this.windowWidth;
  this.height = this.windowHeight;

}

  // Inputs
 @Input() title = 'Window';
@Input() icon = '🪟';
@Input() zIndex = 700;
@Input() active = false;

  @Input() windowWidth = 360;
@Input() windowHeight = 520;

  // Outputs
  @Output() closeWindow = new EventEmitter<void>();
  @Output() focusWindow = new EventEmitter<void>();
  @Output() minimizeWindow = new EventEmitter<void>();

  // Window position & size
  x = 360;
  y = 120;
  width = 0;
  height = 0;

  // Drag & Resize
  isDragging = false;
  offsetX = 0;
  offsetY = 0;

  isResizing = false;
  resizeStartX = 0;
  resizeStartY = 0;
  startWidth = 0;
  startHeight = 0;

  // Window state
  isMaximized = false;
  isMinimized = false;


  // Save previous size & position for restore
  prevX = 0;
  prevY = 0;
  prevWidth = 0;
  prevHeight = 0;

  // Dragging
  startDrag(event: MouseEvent) {
    if (this.isMaximized || this.isMinimized) return;
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



  const screenW = window.innerWidth;
  const screenH = window.innerHeight;



  /*
      TOP SNAP
      Drag to top
  */

  if(this.y < 20){

    this.x = 0;
    this.y = 0;

    this.width = screenW;
    this.height = screenH - 60;

  }




  /*
      LEFT SNAP
  */

  else if(this.x < 20){


    this.x = 0;

    this.y = 0;


    this.width = screenW / 2;

    this.height = screenH - 60;


  }




  /*
      RIGHT SNAP
  */

  else if(
    this.x + this.width > screenW - 20
  ){


    this.x = screenW / 2;

    this.y = 0;


    this.width = screenW / 2;

    this.height = screenH - 60;


  }

  // TOP LEFT CORNER

if(
this.x < 30 &&
this.y < 30
){

this.x = 0;

this.y = 0;

this.width = screenW / 2;

this.height = screenH / 2;

}



// TOP RIGHT CORNER

if(
this.x > screenW - 100 &&
this.y < 30
){

this.x = screenW / 2;

this.y = 0;

this.width = screenW / 2;

this.height = screenH / 2;

}



// BOTTOM LEFT

if(
this.x < 30 &&
this.y > screenH - 100
){

this.x = 0;

this.y = screenH / 2;

this.width = screenW / 2;

this.height = screenH / 2;

}



// BOTTOM RIGHT

if(
this.x > screenW - 100 &&
this.y > screenH - 100
){

this.x = screenW / 2;

this.y = screenH / 2;

this.width = screenW / 2;

this.height = screenH / 2;

}


}

 stopDrag = () => {

  this.isDragging = false;


  this.applySnap();


  document.removeEventListener(
    'mousemove',
    this.onDrag
  );


  document.removeEventListener(
    'mouseup',
    this.stopDrag
  );

}

applySnap(){

const screenW = window.innerWidth;

const screenH = window.innerHeight;



// TOP

if(this.y < 20){

this.x = 0;

this.y = 0;

this.width = screenW;

this.height = screenH - 60;

return;

}



// LEFT

if(this.x < 20){

this.x = 0;

this.y = 0;

this.width = screenW / 2;

this.height = screenH - 60;

return;

}



// RIGHT

if(this.x + this.width > screenW - 20){

this.x = screenW / 2;

this.y = 0;

this.width = screenW / 2;

this.height = screenH - 60;

return;

}



// TOP LEFT

if(this.x < 30 && this.y < 30){

this.x = 0;

this.y = 0;

this.width = screenW / 2;

this.height = screenH / 2;

return;

}



// TOP RIGHT

if(
this.x > screenW - 100 &&
this.y < 30
){

this.x = screenW / 2;

this.y = 0;

this.width = screenW / 2;

this.height = screenH / 2;

return;

}



// BOTTOM LEFT

if(
this.x < 30 &&
this.y > screenH - 100
){

this.x = 0;

this.y = screenH / 2;

this.width = screenW / 2;

this.height = screenH / 2;

return;

}



// BOTTOM RIGHT

if(
this.x > screenW - 100 &&
this.y > screenH - 100
){

this.x = screenW / 2;

this.y = screenH / 2;

this.width = screenW / 2;

this.height = screenH / 2;

return;

}

}

  // Resize
  startResize(event: MouseEvent) {
    event.stopPropagation();
    if (this.isMaximized || this.isMinimized) return;
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
  }

  stopResize = () => {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.onResize);
    document.removeEventListener('mouseup', this.stopResize);
  }

  // Maximize / Restore
  toggleMaximize() {
    if (!this.isMaximized) {
      // Save current size & position
      this.prevX = this.x;
      this.prevY = this.y;
      this.prevWidth = this.width;
      this.prevHeight = this.height;

      // Maximize
      this.x = 0;
      this.y = 0;
      this.width = window.innerWidth;
      this.height = window.innerHeight - 60;
    } else {
      // Restore
      this.x = this.prevX;
      this.y = this.prevY;
      this.width = this.prevWidth;
      this.height = this.prevHeight;
    }
    this.isMaximized = !this.isMaximized;
    this.isMinimized = false;
  }

  // Minimize / Restore
 toggleMinimize(){

  this.minimizeWindow.emit();

}

  // Focus window (bring to top)
  focus() {
  this.focusWindow.emit();
}

  // Close window
 close(){

  this.isClosing = true;


  setTimeout(()=>{

    this.closeWindow.emit();

  },300);

}
}