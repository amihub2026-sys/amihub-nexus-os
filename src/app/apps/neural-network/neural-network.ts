import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-neural-network',
  standalone: true,
  templateUrl: './neural-network.html',
  styleUrls: ['./neural-network.css']
})
export class NeuralNetwork {


  @Output() closeApp = new EventEmitter<void>();


  close(){

    this.closeApp.emit();

  }


}