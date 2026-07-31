import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootScreenComponent } from './boot-screen/boot-screen.component';
import { Desktop } from './desktop/desktop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BootScreenComponent, Desktop],
  template: `
    <app-boot-screen *ngIf="showBoot" (bootComplete)="showBoot=false"></app-boot-screen>
    <app-desktop *ngIf="!showBoot"></app-desktop>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {
  showBoot = true;
}