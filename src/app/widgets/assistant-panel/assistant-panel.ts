import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assistant-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './assistant-panel.html',
  styleUrls: ['./assistant-panel.css']
})
export class AssistantPanel {
  @Output() commandSend = new EventEmitter<string>();
  @ViewChild('chatBody') chatBody!: ElementRef;

  command = '';
  isListening = false;
  isCollapsed = false;

  messages = [
    { from: 'nexus', text: 'Hello, I am Nexus. How can I help you?', time: this.currentTime() }
  ];

  sendCommand() {
    const text = this.command.trim();
    if (!text) return;

    const timestamp = this.currentTime();
    this.messages.push({ from: 'user', text, time: timestamp });
    this.messages.push({ from: 'nexus', text: 'Command received.', time: timestamp });

    this.commandSend.emit(text);
    this.command = '';
    this.scrollToBottom();
  }

  startVoice() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      this.messages.push({ from: 'nexus', text: 'Voice not supported.', time: this.currentTime() });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    this.isListening = true;
    recognition.start();

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      this.messages.push({ from: 'user', text, time: this.currentTime() });
      this.commandSend.emit(text);
      this.isListening = false;
      this.scrollToBottom();
    };

    recognition.onerror = () => {
      this.messages.push({ from: 'nexus', text: 'Microphone error.', time: this.currentTime() });
      this.isListening = false;
      this.scrollToBottom();
    };
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
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