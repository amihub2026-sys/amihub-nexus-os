import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-camera-vision',
  standalone: true,
  templateUrl: './camera-vision.html',
  styleUrls: ['./camera-vision.css']
})
export class CameraVision {


  @Output() closeApp = new EventEmitter<void>();


  close(){

    this.closeApp.emit();

  }


}