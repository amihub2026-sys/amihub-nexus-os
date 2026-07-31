import {
  Component,
  Input,
  OnChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';


@Component({
  selector:'app-module-boot',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./module-boot.html',
  styleUrls:['./module-boot.css']
})
export class ModuleBoot implements OnChanges {


  @Input() moduleName = '';

  @Output() bootComplete =
  new EventEmitter<void>();


  progress = 0;

  logs:string[] = [];

  online = false;



  constructor(
    private cdr:ChangeDetectorRef
  ){}



 ngOnChanges(){

if(this.moduleName){

this.startBoot();

}

}





  getBootSteps(){


    const bootMap:any = {


      "Camera Vision":[

        "Initializing Vision Core",
        "Loading Image Processor",
        "Connecting Camera Service",
        "Starting Object Detection",
        "Vision AI Ready"

      ],



      "Music":[

        "Initializing Audio Core",
        "Loading Sound Drivers",
        "Connecting Media Engine",
        "Preparing Playlist",
        "Music Service Ready"

      ],



      "AI Engine":[

        "Initializing AI Core",
        "Loading Neural Models",
        "Connecting Intelligence Layer",
        "Activating AI Processor",
        "AI Engine Ready"

      ],



      "Web Engine":[

        "Initializing Browser Core",
        "Loading Network Engine",
        "Connecting Internet Layer",
        "Preparing Rendering Engine",
        "Web Engine Ready"

      ],



      "Cloud Sync":[

        "Initializing Cloud Core",
        "Checking Storage",
        "Connecting Secure Server",
        "Syncing Data",
        "Cloud Service Ready"

      ],



      "Neural Network":[

        "Initializing Neural Core",
        "Loading Deep Learning Model",
        "Training Network Layer",
        "Activating Pattern Engine",
        "Neural Network Ready"

      ],



      "Data Core":[

        "Initializing Database Core",
        "Loading Memory System",
        "Checking Data Integrity",
        "Connecting Storage",
        "Data Core Ready"

      ]


    };



    return bootMap[this.moduleName] || [

      "Initializing Core System",
      "Loading Module Kernel",
      "Checking Dependencies",
      "Connecting Services",
      "Module Ready"

    ];

  }






  startBoot(){


    this.progress = 0;

    this.logs = [];

    this.online=false;



    const steps =
    this.getBootSteps();



    let index=0;



    const timer =
    setInterval(()=>{


      if(index < steps.length){


        this.logs.push(
          steps[index]
        );


        this.progress +=20;


        this.cdr.detectChanges();


        index++;


      }

      else{


        clearInterval(timer);


        this.progress=100;

        this.online=true;


        this.cdr.detectChanges();



        setTimeout(()=>{


          this.bootComplete.emit();


        },700);



      }



    },600);



  }



}