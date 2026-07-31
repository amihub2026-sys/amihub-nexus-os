import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WindowManager } from '../../window-manager/window-manager';

import { AssistantPanel } from '../assistant-panel/assistant-panel';

import { MusicPlayer } from '../../apps/music-player/music-player';

import { FileExplorer } from '../../apps/file-explorer/file-explorer';



@Component({
  selector: 'app-vision-dock',
  standalone:true,

  imports:[
    CommonModule,
    WindowManager
  ],

  templateUrl:'./vision-dock.html',
  styleUrls:['./vision-dock.css']
})


export class VisionDock {


apps = [

{
 name:'Voice AI',
 icon:'🎤',
 component:AssistantPanel
},

{
 name:'Music Player',
 icon:'🎵',
 component:MusicPlayer
},

{
 name:'File Explorer',
 icon:'📁',
 component:FileExplorer
}

];


openWindows:any[]=[];


currentZIndex = 700;



openApp(app:any){


const existing =
this.openWindows.find(
w=>w.name === app.name
);



if(existing){

  existing.minimized = false;

  this.focusWindow(existing);

  return;

}



this.currentZIndex++;


const newWindow={

...app,

minimized:false,

zIndex:this.currentZIndex

};



this.openWindows.push(newWindow);


}




focusWindow(win:any){


this.currentZIndex++;


win.zIndex=this.currentZIndex;


}




closeWindow(index:number){

this.openWindows.splice(index,1);

}




minimizeWindow(win:any){

win.minimized=true;

}




restoreWindow(win:any){

win.minimized=false;

this.focusWindow(win);

}



}