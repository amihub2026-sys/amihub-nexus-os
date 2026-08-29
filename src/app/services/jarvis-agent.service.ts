import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class JarvisAgentService {

  private socket: Socket;

  constructor() {

    this.socket = io('http://127.0.0.1:5000', {
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log(
        '%c JARVIS LOCAL AGENT CONNECTED ',
        'background:#00e5ff;color:#000;font-weight:bold;padding:4px'
      );
    });

    this.socket.on('connect_error', (error) => {
      console.error('JARVIS AGENT CONNECTION ERROR:', error.message);
    });

    this.socket.on('disconnect', () => {
      console.warn('JARVIS LOCAL AGENT DISCONNECTED');
    });
  }

  getSystemInfo(): void {
    this.socket.emit('system-info');
  }

  onSystemInfo(callback: (data: any) => void): void {
    this.socket.on('system-info-result', callback);
  }

  onStatus(callback: (data: any) => void): void {
    this.socket.on('jarvis-status', callback);
  }

  onError(callback: (data: any) => void): void {
    this.socket.on('jarvis-error', callback);
  }

  openApp(appName: string): void {
  this.socket.emit('open-app', appName);
}

openFolder(folderName: string): void {
  this.socket.emit('open-folder', folderName);
}

onCommandResult(callback: (data: any) => void): void {
  this.socket.on('command-result', callback);
}

}