import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({

selector:'app-diagnostics-panel',

standalone:true,

imports:[
CommonModule
],

templateUrl:'./diagnostics-panel.html',

styleUrls:[
'./diagnostics-panel.css'
]

})


export class DiagnosticsPanel{


diagnostics = [

{
name:'Vision AI',
status:'ONLINE'
},

{
name:'Voice Core',
status:'ONLINE'
},

{
name:'AI Engine',
status:'ONLINE'
},

{
name:'Modules',
status:'10/10 ONLINE'
},

{
name:'Memory Core',
status:'READY'
},

{
name:'Security',
status:'ACTIVE'
}

];


}