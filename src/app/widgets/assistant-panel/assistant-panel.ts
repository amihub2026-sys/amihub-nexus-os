import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assistant-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assistant-panel.html',
  styleUrls: ['./assistant-panel.css']
})
export class AssistantPanel implements AfterViewInit {
  @Output() commandSend = new EventEmitter<string>();
  @ViewChild('chatBody') chatBody!: ElementRef;

  command = '';

isListening = false;

isCollapsed = false;

wakeMode = false;

  messages = [
 { 
 from:'nexus',
 text:'Hello, I am Nexus. How can I help you?',
 time:this.currentTime()
 }
];


constructor(){

}


ngAfterViewInit(){

setTimeout(()=>{

this.speak(
"Hello, I am Nexus. How can I help you?"
);

},1000);

}

  sendCommand() {
    const text = this.command.trim();
    if (!text) return;

    const timestamp = this.currentTime();
    this.messages.push({ from: 'user', text, time: timestamp });
    const reply =
"Command received. Processing now.";


this.messages.push({
from:'nexus',
text:reply,
time:timestamp
});


this.speak(reply);

    this.commandSend.emit(text);
    this.command = '';
    this.scrollToBottom();
  }

 public speak(text:string){


if(!window.speechSynthesis){

console.log(
"Speech synthesis not supported"
);

return;

}



const speech =
new SpeechSynthesisUtterance(text);



speech.lang = "en-US";

speech.rate = 0.85;

speech.pitch = 0.65;

speech.volume = 1;



window.speechSynthesis.cancel();



setTimeout(()=>{

window.speechSynthesis.speak(
speech
);

},100);



}

startWakeMode(){


this.wakeMode = true;


const SpeechRecognition =
(window as any).SpeechRecognition ||
(window as any).webkitSpeechRecognition;


if(!SpeechRecognition){

console.log(
"Speech recognition not supported"
);

return;

}


const recognition =
new SpeechRecognition();


recognition.lang = "en-US";

recognition.continuous = true;

recognition.interimResults = false;



recognition.onresult = (event:any)=>{


const text =
event.results[
event.results.length - 1
][0].transcript.toLowerCase();



console.log(
"Nexus heard:",
text
);



if(text.includes("hey vision")){


this.messages.push({

from:'nexus',

text:'Yes sir?',

time:this.currentTime()

});


this.speak(
"Yes sir?"
);


this.startCommandMode();


}


};



recognition.start();


}

startCommandMode(){


const SpeechRecognition =
(window as any).SpeechRecognition ||
(window as any).webkitSpeechRecognition;



const recognition =
new SpeechRecognition();


recognition.lang="en-US";

recognition.continuous=false;

recognition.interimResults=false;



recognition.onresult=(event:any)=>{


const command =
event.results[0][0].transcript;



this.messages.push({

from:'user',

text:command,

time:this.currentTime()

});



const lower =
command.toLowerCase();



if(lower.includes("open")){


this.speak(
"Opening application"
);


}


this.commandSend.emit(command);



this.scrollToBottom();


};



recognition.start();


}

  startVoice() {

  // show listening immediately
  this.isListening = true;

  console.log("START VOICE FUNCTION RUNNING");


  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;


  if (!SpeechRecognition) {

    this.messages.push({
      from:'nexus',
      text:'Voice not supported.',
      time:this.currentTime()
    });

    this.isListening = false;

    return;

  }


  const recognition = new SpeechRecognition();

  recognition.lang = 'en-US';

  recognition.continuous = false;

  recognition.interimResults = false;


  recognition.start();



  recognition.onresult = (event:any)=>{

    const text =
    event.results[0][0].transcript;


    this.messages.push({
      from:'user',
      text:text,
      time:this.currentTime()
    });

    this.speak(
"Processing command"
);


    this.commandSend.emit(text);


    this.isListening=false;


    this.scrollToBottom();

  };



  recognition.onerror = ()=>{

    this.messages.push({
      from:'nexus',
      text:'Microphone error.',
      time:this.currentTime()
    });


    this.isListening=false;


    this.scrollToBottom();

  };


  recognition.onend = ()=>{

  console.log("VOICE ENDED");

  if(this.isListening){

    this.isListening = false;

  }

};

}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

activateVoice(){

  console.log("ACTIVATE VOICE CALLED");

  this.isCollapsed = false;

  setTimeout(()=>{

    console.log("STARTING VOICE");

    this.startVoice();

  },300);

}

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatBody) {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    }, 50);
  }

  currentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
}