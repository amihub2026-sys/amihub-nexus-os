import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ai-engine',
  standalone: true,
  templateUrl: './ai-engine.html',
  styleUrls: ['./ai-engine.css']
})
export class AiEngine {


  @Output() closeApp = new EventEmitter<void>();


  close(){

    this.closeApp.emit();

  }


}