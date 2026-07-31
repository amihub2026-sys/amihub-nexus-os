import { Component, ViewChild, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';import { CommonModule } from '@angular/common';
import { OsManagerService } from '../core/services/os-manager.service';

import { AiCoreComponent } from '../core/ai-core/ai-core.component';
import { LiveClockComponent } from '../widgets/live-clock/live-clock.component';
import { NotificationPanel } from '../widgets/notification-panel/notification-panel';
import { SystemStatus } from '../widgets/system-status/system-status';
import { ModulesPanel } from '../widgets/modules-panel/modules-panel';
import { Taskbar } from '../taskbar/taskbar';
import { FileExplorer } from '../apps/file-explorer/file-explorer';
import { MusicPlayer } from '../apps/music-player/music-player';
import { WindowManager } from '../window-manager/window-manager';
import { AssistantPanel } from '../widgets/assistant-panel/assistant-panel';
import { AmiHologram } from '../core/ami-hologram/ami-hologram';
import { DataCore } from '../apps/data-core/data-core';
import { AiEngine } from '../apps/ai-engine/ai-engine';
import { WebEngine } from '../apps/web-engine/web-engine';
import { AppEngine } from '../apps/app-engine/app-engine';
import { CloudSync } from '../apps/cloud-sync/cloud-sync';
import { CameraVision } from '../apps/camera-vision/camera-vision';
import { NeuralNetwork } from '../apps/neural-network/neural-network';
import { ModuleBoot } from '../widgets/module-boot/module-boot';
import { ModuleManagerService } from '../core/services/module-manager.service';


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
    Taskbar,
    FileExplorer,
    MusicPlayer,
    WindowManager,
    AssistantPanel,
    DataCore,
    AiEngine,
    WebEngine,
    AppEngine,
    CloudSync,
    CameraVision,
    NeuralNetwork,
    ModuleBoot
  ],
  templateUrl: './desktop.html',
  styleUrls: ['./desktop.css']
})
export class Desktop implements OnInit {

bootingModule = '';

showAssistant = true;

systemBoot = false;

systemLogs:string[] = [];

 @ViewChild(AssistantPanel)
assistantPanel?: AssistantPanel;

  openWindows: { name: string; z: number; minimized?: boolean }[] = [];
  zCounter = 800;
  activeApp = '';

 constructor(
  private os: OsManagerService,
  private moduleManager: ModuleManagerService,
  private cdr: ChangeDetectorRef
) {

}

ngOnInit(){

this.startSystemBoot();

}


startSystemBoot(){

this.systemBoot = true;

this.systemLogs = [];

const logs = [

"Initializing Nexus Core",
"Checking AI Engine",
"Loading Vision System",
"Connecting Modules",
"Activating Neural Network",
"Vision AI Online"

];


let index = 0;


const timer = setInterval(()=>{


this.systemLogs.push(
logs[index]
);


this.cdr.detectChanges();


index++;



if(index >= logs.length){


clearInterval(timer);



setTimeout(()=>{


this.systemBoot = false;


// SET VISION AI ONLINE
this.moduleManager.activateVisionAI();



this.cdr.detectChanges();



setTimeout(()=>{

this.assistantPanel?.speak(
"Welcome sir. Vision AI online. All systems are operational."
);


setTimeout(()=>{

this.assistantPanel?.startWakeMode();

},3000);


},500);



},1000);



}


},700);


}


  openHoloApp(app: string) {


  if (app === 'Voice AI') {

    this.showAssistant = true;

    setTimeout(() => {
      this.assistantPanel?.startVoice();
    },300);

    return;
  }



  const status =
  this.moduleManager.getModuleStatus(app);



  console.log(
    "MODULE STATUS:",
    app,
    status
  );



  // Already online
  if(status === 'ONLINE'){

    this.openApp(app);

    return;

  }



  // Already booting
  if(status === 'BOOTING'){

    console.log(
      "Already booting:",
      app
    );

    return;

  }



  // Start new boot

  this.bootingModule = app;

this.os.open(app);

this.checkBootStatus();


}

  onBootComplete(){

if(this.bootingModule){

const app =
this.bootingModule;


this.assistantPanel?.speak(
app + " online"
);


this.openApp(app);


this.bootingModule='';

}

}

  checkBootStatus(){

const check =
setInterval(()=>{


if(!this.bootingModule){

clearInterval(check);

return;

}



const status =
this.moduleManager.getModuleStatus(
this.bootingModule
);



console.log(
this.bootingModule,
status
);



if(status === 'ONLINE'){


clearInterval(check);


const app =
this.bootingModule;



this.assistantPanel?.speak(

app + " is now online"

);



this.openApp(app);



this.bootingModule='';


}



},200);



}

  // Window management
  openApp(appName: string) {


  this.activeApp = appName;


  const existing =
  this.openWindows.find(
    w => w.name === appName
  );


  if(existing){

    existing.minimized = false;
    existing.z = ++this.zCounter;

    return;

  }


  this.openWindows.push({

    name: appName,

    z: ++this.zCounter,

    minimized:false

  });

}

  focusApp(appName:string){


this.activeApp = appName;


const win =
this.openWindows.find(
w=>w.name===appName
);



if(win){


win.minimized = false;


win.z = ++this.zCounter;


}


}

  closeApp(appName: string) {
    this.openWindows = this.openWindows.filter(w => w.name !== appName);
    this.os.close(appName);
  }

 minimizeApp(appName:string){

const win =
this.openWindows.find(
w=>w.name===appName
);


if(win){

win.minimized = true;

}


this.activeApp='';

}

restoreApp(appName:string){

const win =
this.openWindows.find(
w=>w.name===appName
);


if(win){

win.minimized = false;

win.z = ++this.zCounter;

this.activeApp = appName;

}

}

  executeVoiceCommand(command: string) {
    const cmd = command.toLowerCase();
    const map: Record<string, string> = {
      music: 'Music',
      file: 'Files',
      explorer: 'Files',
      folder: 'Files',
      'data core': 'Data Core',
      'ai engine': 'AI Engine',
      'artificial intelligence': 'AI Engine',
      'ai core': 'AI Engine',
      'web engine': 'Web Engine',
      browser: 'Web Engine',
      'app engine': 'App Engine',
      application: 'App Engine',
      'cloud sync': 'Cloud Sync',
      cloud: 'Cloud Sync',
      'camera vision': 'Camera Vision',
      camera: 'Camera Vision',
      'neural network': 'Neural Network',
      neural: 'Neural Network',
      'voice ai': 'Voice AI',
      voice: 'Voice AI',
      mic: 'Voice AI'
    };

    for (const key in map) {
      if (cmd.includes(key)) {
        const app = map[key];
        if (app === 'Voice AI') {
          this.showAssistant = true;
          setTimeout(() => this.assistantPanel?.startVoice(), 300);
        }else {

this.assistantPanel?.speak(
"Opening " + app
);


this.openHoloApp(app);

}
        return;
      }
    }
  }
getIcon(name:string){

const icons:any={

'Vision AI':'⚡',
'Files':'📁',
'Music':'🎵',
'Data Core':'💾',
'AI Engine':'🧠',
'Web Engine':'🌐',
'App Engine':'📦',
'Cloud Sync':'☁️',
'Camera Vision':'👁️',
'Neural Network':'🧬'

};


return icons[name] || '🪟';

}

@HostListener('window:keydown', ['$event'])
handleKeyboard(event: KeyboardEvent){


  // CTRL + Q CLOSE

  if(
    event.ctrlKey &&
    event.key.toLowerCase() === 'q'
  ){

    if(this.activeApp){

      this.closeApp(
        this.activeApp
      );

    }

  }



  // CTRL + M MINIMIZE

  if(
    event.ctrlKey &&
    event.key.toLowerCase() === 'm'
  ){

    if(this.activeApp){

      this.minimizeApp(
        this.activeApp
      );

    }

  }



  // ALT + TAB SWITCH

  if(
    event.altKey &&
    event.key === 'Tab'
  ){

    event.preventDefault();

    this.switchWindow();

  }



}

switchWindow(){

if(this.openWindows.length === 0)
return;


let index =
this.openWindows.findIndex(
w=>w.name === this.activeApp
);



index++;


if(index >= this.openWindows.length){

index = 0;

}



const next =
this.openWindows[index];


this.focusApp(
next.name
);


}

}