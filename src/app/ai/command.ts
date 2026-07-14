import { Injectable } from '@angular/core';

export type VisionCommand =
  | 'OPEN_FILES'
  | 'OPEN_MUSIC'
  | 'CLOSE_FILES'
  | 'CLOSE_MUSIC'
  | 'TIME'
  | 'UNKNOWN';

@Injectable({
  providedIn: 'root'
})
export class Command {
  parse(text: string): VisionCommand {
    const cmd = text.toLowerCase();

    if (cmd.includes('open files') || cmd.includes('open file')) {
      return 'OPEN_FILES';
    }

    if (cmd.includes('open music') || cmd.includes('music')) {
      return 'OPEN_MUSIC';
    }

    if (cmd.includes('close files') || cmd.includes('close file')) {
      return 'CLOSE_FILES';
    }

    if (cmd.includes('close music')) {
      return 'CLOSE_MUSIC';
    }

    if (cmd.includes('time')) {
      return 'TIME';
    }

    return 'UNKNOWN';
  }
}