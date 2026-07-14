import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-clock.component.html',
  styleUrls: ['./live-clock.component.css']
})
export class LiveClockComponent implements OnInit {

  time = '';
  day = '';
  date = '';

  ngOnInit() {
    this.updateClock();

    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock() {
    const now = new Date();

    this.time = now.toLocaleTimeString();

    this.day = now.toLocaleDateString('en-US', {
      weekday: 'long'
    });

    this.date = now.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}