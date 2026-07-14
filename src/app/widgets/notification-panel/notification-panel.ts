import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type NoticeType = 'success' | 'info' | 'warning';

interface Notice {
  message: string;
  type: NoticeType;
}

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-panel.html',
  styleUrls: ['./notification-panel.css']
})
export class NotificationPanel implements OnInit {
  notifications: Notice[] = [];

  private messages: Notice[] = [
    { message: 'AI Core Initialized', type: 'success' },
    { message: 'Cloud Sync Completed', type: 'info' },
    { message: 'Voice Engine Ready', type: 'success' },
    { message: 'Security Scan Finished', type: 'warning' },
    { message: 'Memory Optimized', type: 'info' }
  ];

  ngOnInit() {
    let index = 0;

    setInterval(() => {
      this.notifications.unshift(this.messages[index]);

      if (this.notifications.length > 3) {
        this.notifications.pop();
      }

      index = (index + 1) % this.messages.length;
    }, 2500);
  }
}