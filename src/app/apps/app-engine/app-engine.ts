import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-app-engine',
  standalone: true,
  templateUrl: './app-engine.html',
  styleUrls: ['./app-engine.css']
})
export class AppEngine {

  @Output() closeApp = new EventEmitter<void>();

  close(){

    this.closeApp.emit();

  }

}