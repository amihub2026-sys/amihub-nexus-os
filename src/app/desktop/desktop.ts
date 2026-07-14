import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AiCoreComponent } from '../core/ai-core/ai-core.component';
import { LiveClockComponent } from '../widgets/live-clock/live-clock.component';
import { NotificationPanel } from '../widgets/notification-panel/notification-panel';
import { SystemStatus } from '../widgets/system-status/system-status';
import { ModulesPanel } from '../widgets/modules-panel/modules-panel';
import { AssistantPanel } from '../widgets/assistant-panel/assistant-panel';
import { Taskbar } from '../taskbar/taskbar';

import { FileExplorer } from '../apps/file-explorer/file-explorer';
import { MusicPlayer } from '../apps/music-player/music-player';
import { WindowManager } from '../window-manager/window-manager';
import { AmiHologram } from '../core/ami-hologram/ami-hologram';


@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
  CommonModule,
  AiCoreComponent,
  AmiHologram,
  LiveClockComponent,
  NotificationPanel,
  SystemStatus,
  ModulesPanel,
  AssistantPanel,
  Taskbar,
  FileExplorer,
  MusicPlayer,
  WindowManager
],
  templateUrl: './desktop.html',
  styleUrls: ['./desktop.css']
})
export class Desktop {

  openWindows: { name: string; z: number }[] = [];

  zCounter = 800;


  // OPEN APPLICATION
  openApp(appName: string) {

    const existing = this.openWindows.find(
      w => w.name === appName
    );


    if (existing) {

      existing.z = ++this.zCounter;
      return;

    }


    this.openWindows.push({

      name: appName,
      z: ++this.zCounter

    });

  }



  // BRING WINDOW TO FRONT
  focusApp(appName: string) {

    const win = this.openWindows.find(
      w => w.name === appName
    );


    if (win) {

      win.z = ++this.zCounter;

    }

  }



  // CLOSE APPLICATION
  closeApp(appName: string) {

    this.openWindows =
      this.openWindows.filter(
        w => w.name !== appName
      );

  }



  // VOICE COMMAND HANDLER
  executeVoiceCommand(command: string) {

    const cmd = command.toLowerCase();



    if (cmd.includes('music')) {

      this.openApp('Music');
      return;

    }



    if (
      cmd.includes('file') ||
      cmd.includes('explorer') ||
      cmd.includes('folder')
    ) {

      this.openApp('Files');
      return;

    }



    if (cmd.includes('close music')) {

      this.closeApp('Music');
      return;

    }



    if (
      cmd.includes('close file') ||
      cmd.includes('close explorer')
    ) {

      this.closeApp('Files');
      return;

    }

  }

}