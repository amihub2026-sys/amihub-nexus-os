import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleManagerService, ModuleStatus } from '../../core/services/module-manager.service';


@Component({
  selector: 'app-modules-panel',
  standalone:true,
  imports:[
    CommonModule
  ],
  templateUrl:'./modules-panel.html',
  styleUrls:['./modules-panel.css']
})
export class ModulesPanel implements OnInit {


  modules: ModuleStatus[] = [];


  constructor(
    private moduleManager: ModuleManagerService,
    private cdr: ChangeDetectorRef
  ){}



  ngOnInit(){


    this.moduleManager.modules$
    .subscribe(data=>{


      console.log(
        "MODULE PANEL UPDATE:",
        data
      );


      this.modules = [...data];


      // force UI refresh
      this.cdr.detectChanges();


    });


  }



}