import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-explorer.html',
  styleUrls: ['./file-explorer.css']
})
export class FileExplorer {
  @Output() closeApp = new EventEmitter<void>();

  close() {
    this.closeApp.emit();
  }
}