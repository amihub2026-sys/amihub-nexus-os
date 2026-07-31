import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cloud-sync',
  standalone: true,
  templateUrl: './cloud-sync.html',
  styleUrls: ['./cloud-sync.css']
})
export class CloudSync {


  @Output() closeApp = new EventEmitter<void>();


  close(){

    this.closeApp.emit();

  }


}