import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleManagerService, ModuleStatus } from '../core/services/module-manager.service';

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taskbar.html',
  styleUrls: ['./taskbar.css']
})
export class Taskbar implements OnInit {

 @Input() openWindows: { 
  name:string;
  z:number;
  minimized?:boolean;
}[] = [];


@Input() activeApp = '';
  @Input() bootingModule = ''; // Current module booting

  modules: ModuleStatus[] = [];

  @Output() appOpen = new EventEmitter<string>();
  @Output() appFocus = new EventEmitter<string>();
  @Output() appRestore =
new EventEmitter<string>();

constructor(
  private moduleManager: ModuleManagerService
){}

  time = '';
  menuOpen = false;

  apps = [
    { name: 'Files', icon: '📁' },
    { name: 'Music', icon: '🎵' },
    { name: 'Web Engine', icon: '🌐' },
    { name: 'App Engine', icon: '📦' },
    { name: 'AI Engine', icon: '🧠' },
    { name: 'Cloud Sync', icon: '☁️' },
    { name: 'Camera Vision', icon: '👁️' },
    { name: 'Data Core', icon: '💾' },
    { name: 'Neural Network', icon: '🧬' }
  ];

  ngOnInit() {


  this.updateTime();


  setInterval(() => {
    this.updateTime();
  },1000);



  this.moduleManager.modules$
  .subscribe(data=>{

    this.modules = data;

  });


}

restoreApp(app:string){

this.appRestore.emit(app);

}

  updateTime() {
    this.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  openApp(app: string) {
    this.appOpen.emit(app);
  }

  focusApp(app: string) {

const window =
this.openWindows.find(
w=>w.name===app
);

if(window?.minimized){

this.appRestore.emit(app);

}
else{

this.appFocus.emit(app);

}

}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isBooting(appName: string) {
    return this.bootingModule === appName;
  }

  getModuleStatus(name:string){


 const module =
 this.modules.find(
   m=>m.name === name
 );


 return module?.status || 'OFFLINE';


}

}