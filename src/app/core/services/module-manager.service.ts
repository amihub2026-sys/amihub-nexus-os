import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export type ModuleState =
  | 'OFFLINE'
  | 'BOOTING'
  | 'ONLINE';


export interface ModuleStatus {
  name: string;
  status: ModuleState;
}


@Injectable({
  providedIn: 'root'
})
export class ModuleManagerService {


  private modulesSubject =
new BehaviorSubject<ModuleStatus[]>([

      { name:'Vision AI', status:'OFFLINE' },

      { name:'Files', status:'OFFLINE' },

      { name:'Music', status:'OFFLINE' },

      { name:'Web Engine', status:'OFFLINE' },

      { name:'App Engine', status:'OFFLINE' },

      { name:'AI Engine', status:'OFFLINE' },

      { name:'Cloud Sync', status:'OFFLINE' },

      { name:'Voice AI', status:'OFFLINE' },

      { name:'Camera Vision', status:'OFFLINE' },

      { name:'Neural Network', status:'OFFLINE' },

      { name:'Data Core', status:'OFFLINE' }

]);


  modules$ =
  this.modulesSubject.asObservable();



  getModules(): ModuleStatus[] {

    return this.modulesSubject.getValue();

  }



  bootModule(name:string){


console.log(
  "BOOT START:",
  name
);



this.updateStatus(
  name,
  'BOOTING'
);



setTimeout(()=>{


console.log(
  "BOOT COMPLETE:",
  name
);



this.updateStatus(
  name,
  'ONLINE'
);



},3500);



}



private updateStatus(
name:string,
status:ModuleState
){


const updated =
this.getModules().map(module =>

module.name === name

?
{
 ...module,
 status
}

:
module

);


this.modulesSubject.next(updated);


}

getModuleStatus(name:string): ModuleState | undefined {

  const module = this.getModules()
    .find(m => m.name === name);

  return module?.status;

}


  shutdownModule(name:string){


    const offline =
    this.getModules().map(module =>


      module.name === name

      ? {
          ...module,
          status:'OFFLINE' as ModuleState
        }

      : module


    );


    this.modulesSubject.next(offline);


  }

activateVisionAI(){

this.updateStatus(
'Vision AI',
'ONLINE'
);

console.log(
'Vision AI SYSTEM ONLINE'
);

}

}