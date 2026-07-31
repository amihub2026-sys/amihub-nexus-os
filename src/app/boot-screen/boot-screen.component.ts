import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';


@Component({
  selector:'app-boot-screen',
  standalone:true,
  imports:[
    CommonModule
  ],
  templateUrl:'./boot-screen.component.html',
  styleUrls:['./boot-screen.component.css']
})
export class BootScreenComponent implements OnInit {


@Output() bootComplete = new EventEmitter<void>();


progress = 0;


logs:string[] = [];


isClosing = false;



constructor(
 private cdr:ChangeDetectorRef
){}



ngOnInit(){


const messages=[

"Initializing AI Core...",
"Loading Neural Network...",
"Connecting Modules...",
"Starting Nexus Engine...",
"System Ready"

];


let index=0;



const timer=setInterval(()=>{


this.progress += 2;



if(index < messages.length){

this.logs.push(messages[index]);

index++;

}




// FORCE UI UPDATE
this.cdr.detectChanges();




if(this.progress >= 100){


this.progress=100;


clearInterval(timer);



setTimeout(()=>{

this.isClosing = true;


setTimeout(()=>{

this.bootComplete.emit();

},1500);


},1000);



}



},100);



}



}