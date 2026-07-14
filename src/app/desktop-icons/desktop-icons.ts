import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-desktop-icons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desktop-icons.html',
  styleUrls: ['./desktop-icons.css']
})
export class DesktopIcons {
  @Output() appOpen = new EventEmitter<string>();

  apps = [
    { icon: '📁', name: 'Files' },
    { icon: '🌐', name: 'Browser' },
    { icon: '🧮', name: 'Calculator' },
    { icon: '⚙️', name: 'Settings' },
    { icon: '💻', name: 'Terminal' },
    { icon: '🤖', name: 'Vision AI' },
    { icon: '📷', name: 'Camera' },
    { icon: '🎵', name: 'Music' }
  ];

  openApp(app: any) {
    this.appOpen.emit(app.name);
  }
}