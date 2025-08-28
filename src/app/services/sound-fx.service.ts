import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundFxService {
  constructor() { }

  playClickSound() {
    const audio = new Audio();
    audio.src = 'sound_fx/click.mp3';
    audio.load();
    audio.play();
  }

  playCorrectSound() {
    const audio = new Audio();
    audio.src = 'sound_fx/correct.mp3';
    audio.load();
    audio.play();
  }

  playIncorrectSound() {
    const audio = new Audio();
    audio.src = 'sound_fx/incorrect.mp3';
    audio.load();
    audio.play();
  }
}
