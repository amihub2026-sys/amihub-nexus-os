import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modules-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modules-panel.html',
  styleUrls: ['./modules-panel.css']
})
export class ModulesPanel {
  modules = [
    { name: 'Web Engine', status: 'ACTIVE' },
    { name: 'App Engine', status: 'ACTIVE' },
    { name: 'AI Engine', status: 'ONLINE' },
    { name: 'Cloud Sync', status: 'SYNCED' },
    { name: 'Voice AI', status: 'READY' },
    { name: 'Camera Vision', status: 'STANDBY' },
    { name: 'Neural Network', status: 'RUNNING' },
    { name: 'Memory Cache', status: 'OPTIMAL' }
  ];
}