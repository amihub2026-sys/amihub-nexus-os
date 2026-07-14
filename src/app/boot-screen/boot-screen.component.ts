import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Desktop } from '../desktop/desktop';

@Component({
  selector: 'app-boot-screen',
  standalone: true,
  imports: [
    CommonModule,
    Desktop
  ],
  templateUrl: './boot-screen.component.html',
  styleUrls: ['./boot-screen.component.css']
})
export class BootScreenComponent implements OnInit {
  progress = 0;
  bootComplete = false;

  allLogs = [
    'Initializing NEXUS CORE...',
    'Scanning system modules...',
    'Connecting cloud network...',
    'Activating AI engine...',
    'Security protocols enabled...',
    'SYSTEM ONLINE'
  ];

  visibleLogs: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const progressTimer = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 2;
        this.cdr.detectChanges();
      } else {
        clearInterval(progressTimer);

        setTimeout(() => {
          this.bootComplete = true;
          this.cdr.detectChanges();
        }, 700);
      }
    }, 80);

    let index = 0;
    const logTimer = setInterval(() => {
      if (index < this.allLogs.length) {
        this.visibleLogs.push(this.allLogs[index]);
        index++;
        this.cdr.detectChanges();
      } else {
        clearInterval(logTimer);
      }
    }, 600);
  }
}