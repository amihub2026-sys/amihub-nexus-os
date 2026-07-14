import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-vision-dock',
  standalone: true,
  templateUrl: './vision-dock.html',
  styleUrls: ['./vision-dock.css']
})
export class VisionDock {
  @Input() isListening = false;
  @Input() voiceReply = 'Tap microphone to speak';

  @Output() startVoice = new EventEmitter<void>();

  activateVoice() {
    this.startVoice.emit();
  }
}