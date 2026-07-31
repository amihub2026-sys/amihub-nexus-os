import { Component, Output, EventEmitter, Input } from '@angular/core';
import { OsManagerService } from '../services/os-manager.service';

@Component({
  selector:'app-ami-hologram',
  standalone:true,
  templateUrl:'./ami-hologram.html',
  styleUrls:['./ami-hologram.css']
})
export class AmiHologram {


@Output() openApp = new EventEmitter<string>();


@Input() online = false;



constructor(
private os: OsManagerService
){}



launch(appName:string){


console.log(
"Hologram Launch:",
appName
);



if(this.os.isOnline(appName)){


this.openApp.emit(appName);


return;

}



this.openApp.emit(appName);


this.os.open(appName);



}


}