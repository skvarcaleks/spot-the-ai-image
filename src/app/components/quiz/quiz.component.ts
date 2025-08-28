import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { SoundFxService } from '../../services/sound-fx.service';

const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})

export class QuizComponent {
  @Output() ended = new EventEmitter<number>();

  constructor(private soundFx: SoundFxService) {}

  images: { src: string; isAI: boolean }[] = [];

  current = 0;
  score = 0;
  timerLeft = 30;
  timerRef: any;

  ngOnInit() {
    this.startTimer();

    const pool = [
      { src: 'images/2.png', isAI: true },
      { src: 'images/3.png', isAI: true },
      { src: 'images/4.png', isAI: true },
      { src: 'images/5.jpg', isAI: true },
      { src: 'images/9.png', isAI: true },
      { src: 'images/10.jpg', isAI: true },
      { src: 'images/12.png', isAI: true },
      { src: 'images/13.png', isAI: true },
      { src: 'images/18.png', isAI: true },
      { src: 'images/19.png', isAI: true },
      { src: 'images/20.jpg', isAI: true },
      { src: 'images/dog-real.jpg', isAI: false },
      { src: 'images/dog-real2.jpg', isAI: false },
      { src: 'images/dog-real3.jpg', isAI: false },
      { src: 'images/fashion-model-real.jpg', isAI: false },
      { src: 'images/fashion-model-real2.jpg', isAI: false },
      { src: 'images/fashion-model-real3.jpg', isAI: false },
      { src: 'images/man-in-suit-real.jpg', isAI: false },
      { src: 'images/man-in-suit-real2.jpg', isAI: false },
      { src: 'images/man-in-suit-real3.jpg', isAI: false },
    ];

    this.images = shuffle(pool).slice(0, 5);
  }

  startTimer() {
    this.timerLeft = 30;
    this.timerRef = setInterval(() => {
      this.timerLeft--;
      if (this.timerLeft <= 0) this.select(false); // timed out = wrong
    }, 1000);
  }

  select(isAI: boolean) {
    clearInterval(this.timerRef);

    const correct = this.images[this.current].isAI;   // true when image IS AI
    if (isAI === correct) {
      this.playCorrectSound();
      this.score++;                                   // user clicked AI on AI OR Not-AI on Not-AI
    } else {
      this.playIncorrectSound();
    }

    this.current++;
    if (this.current < 5) {
      this.startTimer();
    } else {
      this.ended.emit(this.score);
    }
  }

  playClickSound() {
    this.soundFx.playClickSound();
  }

  playCorrectSound() {
    this.soundFx.playCorrectSound();
  }

  playIncorrectSound() {
    this.soundFx.playIncorrectSound();
  }
}
