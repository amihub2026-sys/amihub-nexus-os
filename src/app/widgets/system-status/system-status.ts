import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-status.html',
  styleUrls: ['./system-status.css']
})
export class SystemStatus implements OnInit {
  cpu = 18;
  ram = 42;
  gpu = 76;
  temp = 34;
  network = 820;

  ngOnInit() {
    setInterval(() => {
      this.cpu = this.random(12, 78);
      this.ram = this.random(30, 88);
      this.gpu = this.random(45, 96);
      this.temp = this.random(31, 42);
      this.network = this.random(300, 980);
    }, 1200);
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}