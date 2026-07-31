import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-web-engine',
  standalone: true,
  templateUrl: './web-engine.html',
  styleUrls: ['./web-engine.css']
})
export class WebEngine {

  @Output() closeApp = new EventEmitter<void>();

  close(){
    this.closeApp.emit();
  }

}