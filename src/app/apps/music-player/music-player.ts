import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-music-player',
  standalone: true,
  templateUrl: './music-player.html',
  styleUrls: ['./music-player.css']
})
export class MusicPlayer {


  @Output() closeApp = new EventEmitter<void>();


  isPlaying = false;

  currentTime = 0;

  duration = 0;


  volume = 70;


  currentSong = {

    title:'Jarvis Theme',

    artist:'Nexus AI',

    file:'assets/audio/jarvis.mp3'

  };



  audio = new Audio(
    this.currentSong.file
  );



  x = 430;

  y = 150;



  isDragging=false;

  offsetX=0;

  offsetY=0;



  constructor(){


    this.audio.volume =
    this.volume / 100;



    this.audio.ontimeupdate=()=>{

      this.currentTime =
      this.audio.currentTime;


      this.duration =
      this.audio.duration || 0;

    };


  }





  togglePlay(){


    if(this.isPlaying){

      this.audio.pause();

    }

    else{

      this.audio.play();

    }


    this.isPlaying =
    !this.isPlaying;


  }





  changeVolume(event:any){


    this.volume =
    event.target.value;


    this.audio.volume =
    this.volume / 100;


  }




  seek(event:any){


    const value =
    event.target.value;


    this.audio.currentTime =
    value;


  }





  formatTime(time:number){


    if(!time) return '0:00';


    const min =
    Math.floor(time/60);


    const sec =
    Math.floor(time%60)
    .toString()
    .padStart(2,'0');


    return `${min}:${sec}`;


  }





  close(){


    this.audio.pause();

    this.closeApp.emit();


  }






  startDrag(event:MouseEvent){


    this.isDragging=true;


    this.offsetX =
    event.clientX-this.x;


    this.offsetY =
    event.clientY-this.y;


    document.addEventListener(
      'mousemove',
      this.onDrag
    );


    document.addEventListener(
      'mouseup',
      this.stopDrag
    );


  }





  onDrag=(event:MouseEvent)=>{


    if(!this.isDragging)
    return;


    this.x =
    event.clientX-this.offsetX;


    this.y =
    event.clientY-this.offsetY;


  }





  stopDrag=()=>{


    this.isDragging=false;


    document.removeEventListener(
      'mousemove',
      this.onDrag
    );


    document.removeEventListener(
      'mouseup',
      this.stopDrag
    );


  }


}