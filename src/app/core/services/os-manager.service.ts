import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
 ModuleManagerService,
 ModuleStatus
} from './module-manager.service';


@Injectable({
 providedIn:'root'
})
export class OsManagerService {


 private activeModule =
 new BehaviorSubject<string>('');


 activeModule$ =
 this.activeModule.asObservable();



 constructor(
  private moduleManager:ModuleManagerService
 ){}




 open(moduleName:string){


  console.log(
   "NEXUS OS Opening:",
   moduleName
  );



  const online =
  this.isOnline(moduleName);



  if(!online){

    this.moduleManager.bootModule(moduleName);

  }



  this.activeModule.next(
    moduleName
  );


 }





 close(moduleName:string){


  console.log(
   "NEXUS OS Closing:",
   moduleName
  );


  this.moduleManager.shutdownModule(
    moduleName
  );


  this.activeModule.next('');



 }





 isOnline(moduleName:string):boolean{


  const module:
  ModuleStatus | undefined =

  this.moduleManager
  .getModules()
  .find(
    m=>m.name===moduleName
  );



  return module?.status === 'ONLINE';


 }



}