import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JarvisAgentService } from '../../services/jarvis-agent.service';


@Component({
  selector: 'app-assistant-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assistant-panel.html',
  styleUrls: ['./assistant-panel.css']
})
export class AssistantPanel implements AfterViewInit {

  @Output() commandSend = new EventEmitter<string>();

  @Output() statusChange = new EventEmitter<string>();

  @ViewChild('chatBody') chatBody!: ElementRef;


  command = '';

  isListening = false;

  isCollapsed = false;

  wakeMode = false;

  jarvisStatus = 'ONLINE';

  recognition: any;

  commandRecognition: any;


  messages = [
    {
      from: 'jarvis',
      text: 'Hello, I am Jarvis. How can I help you?',
      time: this.currentTime()
    }
  ];


  constructor(
    private jarvisAgent: JarvisAgentService
  ) {}


  // =========================================================
  // AFTER VIEW INIT
  // =========================================================

  ngAfterViewInit() {

    // Listen for responses from Mac local agent
    this.jarvisAgent.onCommandResult((result: any) => {

      console.log(
        'JARVIS COMMAND RESULT:',
        result
      );

      if (!result.success) {

        this.messages.push({
          from: 'jarvis',
          text: result.message || 'Unable to execute the command.',
          time: this.currentTime()
        });

        this.speak(
          result.message || 'Unable to execute the command.'
        );

        this.scrollToBottom();
      }

    });


    setTimeout(() => {

      this.speak(
        'Hello, I am Jarvis. How can I help you?'
      );

    }, 1000);

  }


  // =========================================================
  // NORMAL TEXT COMMAND
  // =========================================================

  sendCommand() {

    const text = this.command.trim();

    if (!text) return;


    const timestamp =
      this.currentTime();


    this.messages.push({
      from: 'user',
      text,
      time: timestamp
    });


    // -----------------------------------------
    // FIRST CHECK FOR LOCAL MAC COMMAND
    // -----------------------------------------

    if (this.executeLocalCommand(text)) {

      this.command = '';

      this.scrollToBottom();

      return;
    }


    // -----------------------------------------
    // NORMAL AI COMMAND
    // -----------------------------------------

    const reply =
      'Command received. Processing now.';


    this.messages.push({
      from: 'jarvis',
      text: reply,
      time: timestamp
    });


    this.jarvisStatus =
      'PROCESSING';

    this.statusChange.emit(
      this.jarvisStatus
    );


    this.commandSend.emit(text);


    this.speak(reply);


    this.command = '';

    this.scrollToBottom();

  }


  // =========================================================
  // JARVIS SPEAK
  // =========================================================

  public speak(text: string) {

    this.jarvisStatus =
      'SPEAKING';

    this.statusChange.emit(
      this.jarvisStatus
    );


    if (!window.speechSynthesis) {

      console.log(
        'Speech synthesis not supported'
      );

      return;
    }


    const speech =
      new SpeechSynthesisUtterance(text);


    speech.lang =
      'en-US';

    speech.rate =
      0.85;

    speech.pitch =
      0.65;

    speech.volume =
      1;


    window.speechSynthesis.cancel();


    setTimeout(() => {

      window.speechSynthesis.speak(
        speech
      );


      speech.onend = () => {

        this.jarvisStatus =
          'LISTENING';

        this.statusChange.emit(
          this.jarvisStatus
        );

      };

    }, 100);

  }


  // =========================================================
  // LOCAL MAC COMMAND HANDLER
  // =========================================================

  private executeLocalCommand(
    rawCommand: string
  ): boolean {

    let command =
      rawCommand
        .toLowerCase()
        .trim();


    // Remove wake word
    command = command
      .replace(
        /^hey\s+jarvis[\s,]*/i,
        ''
      )
      .replace(
        /^jarvis[\s,]*/i,
        ''
      )
      .trim();


    console.log(
      'CHECKING LOCAL COMMAND:',
      command
    );


    // =====================================================
    // GOOGLE CHROME
    // =====================================================

    if (
      command === 'open chrome' ||
      command === 'open google chrome' ||
      command === 'launch chrome' ||
      command === 'launch google chrome' ||
      command === 'start chrome'
    ) {

      console.log(
        'JARVIS OS COMMAND: OPEN CHROME'
      );


      this.executeApp(
        'chrome',
        'Opening Google Chrome, sir.'
      );


      return true;
    }


    // =====================================================
    // SAFARI
    // =====================================================

    if (
      command === 'open safari' ||
      command === 'launch safari' ||
      command === 'start safari'
    ) {

      console.log(
        'JARVIS OS COMMAND: OPEN SAFARI'
      );


      this.executeApp(
        'safari',
        'Opening Safari, sir.'
      );


      return true;
    }


    // =====================================================
    // VISUAL STUDIO CODE
    // =====================================================

    if (
      command === 'open vs code' ||
      command === 'open vscode' ||
      command === 'open visual studio code' ||
      command === 'launch vs code' ||
      command === 'launch vscode'
    ) {

      console.log(
        'JARVIS OS COMMAND: OPEN VS CODE'
      );


      this.executeApp(
        'vscode',
        'Opening Visual Studio Code, sir.'
      );


      return true;
    }


    // =====================================================
    // TERMINAL
    // =====================================================

    if (
      command === 'open terminal' ||
      command === 'launch terminal' ||
      command === 'start terminal'
    ) {

      console.log(
        'JARVIS OS COMMAND: OPEN TERMINAL'
      );


      this.executeApp(
        'terminal',
        'Opening Terminal, sir.'
      );


      return true;
    }


    // =====================================================
    // CALCULATOR
    // =====================================================

    if (
      command === 'open calculator' ||
      command === 'launch calculator' ||
      command === 'start calculator'
    ) {

      console.log(
        'JARVIS OS COMMAND: OPEN CALCULATOR'
      );


      this.executeApp(
        'calculator',
        'Opening Calculator, sir.'
      );


      return true;
    }

    // =====================================================
// DOWNLOADS
// =====================================================

if (
  command === 'open downloads' ||
  command === 'open downloads folder' ||
  command === 'show downloads'
) {

  console.log(
    'JARVIS OS COMMAND: OPEN DOWNLOADS'
  );

  this.executeFolder(
    'downloads',
    'Opening Downloads, sir.'
  );

  return true;
}


// =====================================================
// DOCUMENTS
// =====================================================

if (
  command === 'open documents' ||
  command === 'open documents folder' ||
  command === 'show documents'
) {

  console.log(
    'JARVIS OS COMMAND: OPEN DOCUMENTS'
  );

  this.executeFolder(
    'documents',
    'Opening Documents, sir.'
  );

  return true;
}


// =====================================================
// DESKTOP
// =====================================================

if (
  command === 'open desktop' ||
  command === 'show desktop' ||
  command === 'open desktop folder'
) {

  console.log(
    'JARVIS OS COMMAND: OPEN DESKTOP'
  );

  this.executeFolder(
    'desktop',
    'Opening Desktop, sir.'
  );

  return true;
}


    // Not a local command
    return false;

  }


  // =========================================================
  // EXECUTE APPLICATION
  // =========================================================

 private executeApp(
  appName: string,
  message: string
) {

  this.jarvisStatus = 'EXECUTING';

  this.statusChange.emit(
    this.jarvisStatus
  );

  console.log(
    'SENDING TO LOCAL AGENT:',
    appName
  );

  this.jarvisAgent.openApp(
    appName
  );

  this.messages.push({
    from: 'jarvis',
    text: message,
    time: this.currentTime()
  });

  this.scrollToBottom();

  this.speak(
    message
  );

}


// =========================================================
// EXECUTE FOLDER
// =========================================================

private executeFolder(
  folderName: string,
  message: string
) {

  this.jarvisStatus = 'EXECUTING';

  this.statusChange.emit(
    this.jarvisStatus
  );

  console.log(
    'SENDING FOLDER TO LOCAL AGENT:',
    folderName
  );

  this.jarvisAgent.openFolder(
    folderName
  );

  this.messages.push({
    from: 'jarvis',
    text: message,
    time: this.currentTime()
  });

  this.scrollToBottom();

  this.speak(
    message
  );

}


  // =========================================================
  // WAKE MODE
  // =========================================================

  startWakeMode() {

    this.wakeMode =
      true;


    this.jarvisStatus =
      'LISTENING';

    this.statusChange.emit(
      this.jarvisStatus
    );


    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;


    if (!SpeechRecognition) {

      console.log(
        'Speech recognition not supported'
      );

      return;

    }


    // Don't create multiple wake recognizers
    if (this.recognition) {

      try {

        this.recognition.abort();

      }
      catch {}

      this.recognition = null;

    }


    this.recognition =
      new SpeechRecognition();


    this.recognition.lang =
      'en-US';

    this.recognition.continuous =
      true;

    this.recognition.interimResults =
      false;


    // =====================================================
    // WAKE RESULT
    // =====================================================

    this.recognition.onresult =
      (event: any) => {

        const text =
          event.results[
            event.results.length - 1
          ][0]
            .transcript
            .toLowerCase()
            .trim();


        console.log(
          'JARVIS WAKE:',
          text
        );


        if (
          text.includes('hey jarvis') ||
          text.includes('jarvis')
        ) {

          // ---------------------------------------
          // Example:
          // "Jarvis open Chrome"
          // ---------------------------------------

          if (
            this.executeLocalCommand(text)
          ) {

            try {

              this.recognition.stop();

            }
            catch {}


            return;

          }


          // ---------------------------------------
          // Only wake phrase:
          // "Jarvis"
          // ---------------------------------------

          this.jarvisStatus =
            'RESPONDING';

          this.statusChange.emit(
            this.jarvisStatus
          );


          try {

            this.recognition.stop();

          }
          catch {}


          this.speak(
            'Yes sir.'
          );


          setTimeout(() => {

            this.startCommandMode();

          }, 900);

        }

      };


    // =====================================================
    // WAKE ERROR
    // =====================================================

    this.recognition.onerror =
      (event: any) => {

        console.log(
          'Wake recognition error:',
          event?.error
        );


        // Ignore harmless abort caused by switching modes
        if (
          event?.error === 'aborted'
        ) {

          return;

        }


        // Don't immediately create endless restart loops
        setTimeout(() => {

          if (
            this.wakeMode &&
            !this.commandRecognition
          ) {

            this.startWakeMode();

          }

        }, 1500);

      };


    // =====================================================
    // START WAKE RECOGNITION
    // =====================================================

    try {

      this.recognition.start();

    }
    catch (error) {

      console.log(
        'Wake recognition already running'
      );

    }

  }


  // =========================================================
  // COMMAND MODE
  // =========================================================

  startCommandMode() {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;


    if (!SpeechRecognition) {

      return;

    }


    // Stop wake listener while command listener is active
    if (this.recognition) {

      try {

        this.recognition.abort();

      }
      catch {}

      this.recognition = null;

    }


    this.commandRecognition =
      new SpeechRecognition();


    this.commandRecognition.lang =
      'en-US';

    this.commandRecognition.continuous =
      false;

    this.commandRecognition.interimResults =
      false;


    // =====================================================
    // COMMAND RESULT
    // =====================================================

    this.commandRecognition.onresult =
      (event: any) => {

        const command =
          event.results[0][0]
            .transcript
            .trim();


        console.log(
          'COMMAND:',
          command
        );


        this.messages.push({

          from: 'user',

          text: command,

          time: this.currentTime()

        });


        // -----------------------------------------
        // FIRST TRY LOCAL MAC COMMAND
        // -----------------------------------------

        if (
          this.executeLocalCommand(command)
        ) {

          return;

        }


        // -----------------------------------------
        // OTHERWISE SEND TO NORMAL AI
        // -----------------------------------------

        this.jarvisStatus =
          'PROCESSING';

        this.statusChange.emit(
          this.jarvisStatus
        );


        setTimeout(() => {

          this.jarvisStatus =
            'EXECUTING';

          this.statusChange.emit(
            this.jarvisStatus
          );

        }, 500);


        this.commandSend.emit(
          command
        );


        this.speak(
          'Certainly sir. Executing command.'
        );


        this.scrollToBottom();

      };


    // =====================================================
    // COMMAND ERROR
    // =====================================================

    this.commandRecognition.onerror =
      (event: any) => {

        console.log(
          'Command recognition error:',
          event?.error
        );

      };


    // =====================================================
    // COMMAND END
    // =====================================================

    this.commandRecognition.onend =
      () => {

        this.commandRecognition =
          null;


        setTimeout(() => {

          if (this.wakeMode) {

            this.startWakeMode();

          }

        }, 700);

      };


    // =====================================================
    // START COMMAND RECOGNITION
    // =====================================================

    try {

      this.commandRecognition.start();

    }
    catch (error) {

      console.log(
        'Command recognition already running'
      );

    }

  }


  // =========================================================
  // MANUAL VOICE BUTTON
  // =========================================================

  startVoice() {

    this.isListening =
      true;


    console.log(
      'START VOICE FUNCTION RUNNING'
    );


    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;


    if (!SpeechRecognition) {

      this.messages.push({

        from: 'jarvis',

        text: 'Voice not supported.',

        time: this.currentTime()

      });


      this.isListening =
        false;


      this.jarvisStatus =
        'ONLINE';


      return;

    }


    const recognition =
      new SpeechRecognition();


    recognition.lang =
      'en-US';

    recognition.continuous =
      false;

    recognition.interimResults =
      false;


    recognition.start();


    recognition.onresult =
      (event: any) => {

        const text =
          event.results[0][0]
            .transcript
            .trim();


        this.messages.push({

          from: 'user',

          text,

          time: this.currentTime()

        });


        // -----------------------------------------
        // CHECK LOCAL COMMAND
        // -----------------------------------------

        if (
          this.executeLocalCommand(text)
        ) {

          this.isListening =
            false;

          this.scrollToBottom();

          return;

        }


        // -----------------------------------------
        // NORMAL COMMAND
        // -----------------------------------------

        this.jarvisStatus =
          'PROCESSING';

        this.statusChange.emit(
          this.jarvisStatus
        );


        this.commandSend.emit(
          text
        );


        this.speak(
          'Processing command'
        );


        this.isListening =
          false;


        this.scrollToBottom();

      };


    recognition.onerror =
      () => {

        this.messages.push({

          from: 'jarvis',

          text: 'Microphone error.',

          time: this.currentTime()

        });


        this.isListening =
          false;


        this.scrollToBottom();

      };


    recognition.onend =
      () => {

        console.log(
          'VOICE ENDED'
        );


        if (
          this.isListening
        ) {

          this.isListening =
            false;

        }

      };

  }


  // =========================================================
  // COLLAPSE PANEL
  // =========================================================

  toggleCollapse() {

    this.isCollapsed =
      !this.isCollapsed;

  }


  // =========================================================
  // ACTIVATE VOICE
  // =========================================================

  activateVoice() {

    console.log(
      'ACTIVATE VOICE CALLED'
    );


    this.isCollapsed =
      false;


    setTimeout(() => {

      console.log(
        'STARTING VOICE'
      );


      this.startVoice();

    }, 300);

  }


  // =========================================================
  // SCROLL CHAT
  // =========================================================

  scrollToBottom() {

    setTimeout(() => {

      if (
        this.chatBody
      ) {

        this.chatBody.nativeElement.scrollTop =
          this.chatBody.nativeElement.scrollHeight;

      }

    }, 50);

  }


  // =========================================================
  // CURRENT TIME
  // =========================================================

  currentTime(): string {

    return new Date()
      .toLocaleTimeString(
        [],
        {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }
      );

  }

}