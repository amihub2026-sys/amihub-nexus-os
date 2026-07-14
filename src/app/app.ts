import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootScreenComponent } from './boot-screen/boot-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BootScreenComponent],
  template: `<app-boot-screen></app-boot-screen>`,
  styleUrls: ['./app.css']
})
export class AppComponent {}