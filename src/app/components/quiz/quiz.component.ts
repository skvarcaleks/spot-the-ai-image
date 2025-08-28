import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { SoundFxService } from '../../services/sound-fx.service';
import { NgIf } from '@angular/common';

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
  imports: [NgIf],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})

export class QuizComponent {
  @Output() ended = new EventEmitter<number>();

  constructor(private soundFx: SoundFxService) { }

  images: { src: string; isAI: boolean }[] = [];

  current = 0;
  score = 0;
  timerLeft = 30;
  timerRef: any;
  showOverlay = false;
  overlayType: 'correct' | 'incorrect' | null = null;
  isProcessingAnswer = false;

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
      { src: 'images/skyscraper-fake.png', isAI: true },
      { src: 'images/indian-woman-fake.png', isAI: true },
      { src: 'images/market-fake.png', isAI: true },
      { src: 'images/bonfire-guitar-fake.png', isAI: true },
      { src: 'images/airplane-fake.png', isAI: true },
      { src: 'images/burger-fake.png', isAI: true },
      { src: 'images/eiffel-tower-fake.png', isAI: true },
      { src: 'images/church-fake.png', isAI: true },
      { src: 'images/dolphin-fake.png', isAI: true },
      { src: 'images/eagle-fake.png', isAI: true },
      { src: 'images/lion-fake.png', isAI: true },
      { src: 'images/selfie-fake2.png', isAI: true },
      { src: 'images/selfie-fake.png', isAI: true },
      { src: 'images/man-in-suit-fake.png', isAI: true },
      { src: 'images/fashion-model-fake.png', isAI: true },
      { src: 'images/fashion-model-fake2.png', isAI: true },
      { src: 'images/fashion-model-fake3.png', isAI: true },
      { src: 'images/dog-fake.png', isAI: true },
      { src: 'images/dog-fake2.png', isAI: true },
      { src: 'images/dog-fake3.png', isAI: true },

      { src: 'images/dog-real.jpg', isAI: false },
      { src: 'images/dog-real2.jpg', isAI: false },
      { src: 'images/dog-real3.jpg', isAI: false },
      { src: 'images/fashion-model-real.jpg', isAI: false },
      { src: 'images/fashion-model-real2.jpg', isAI: false },
      { src: 'images/fashion-model-real3.jpg', isAI: false },
      { src: 'images/man-in-suit-real.jpg', isAI: false },
      { src: 'images/man-in-suit-real2.jpg', isAI: false },
      { src: 'images/man-in-suit-real3.jpg', isAI: false },
      { src: 'images/bird-real.jpg', isAI: false },
      { src: 'images/cow-real.jpg', isAI: false },
      { src: 'images/dog-surfing-real.jpg', isAI: false },
      { src: 'images/dolphin-real.jpg', isAI: false },
      { src: 'images/giraffe-real.jpg', isAI: false },
      { src: 'images/hot-dog-real.jpg', isAI: false },
      { src: 'images/lion-real.jpg', isAI: false },
    ];

    this.images = shuffle(pool).slice(0, 7);
  }

  startTimer() {
    this.timerLeft = 30;
    this.timerRef = setInterval(() => {
      this.timerLeft--;
      if (this.timerLeft <= 0) this.handleTimeout();
    }, 1000);
  }

  handleTimeout() {
    if (this.isProcessingAnswer) return;
    this.isProcessingAnswer = true;
    clearInterval(this.timerRef);

    // Always show incorrect overlay
    this.overlayType = 'incorrect';
    this.showOverlay = true;
    this.playIncorrectSound();

    setTimeout(() => {
      this.showOverlay = false;
      this.overlayType = null;
      this.isProcessingAnswer = false;

      this.current++;
      if (this.current < 7) {
        this.startTimer();
      } else {
        this.ended.emit(this.score);
      }
    }, 1000);
  }

  select(isAI: boolean) {
    if (this.isProcessingAnswer) return; // Prevent multiple clicks during processing

    this.isProcessingAnswer = true;
    clearInterval(this.timerRef);

    const correct = this.images[this.current].isAI;   // true when image IS AI
    const isCorrect = isAI === correct;

    // Show overlay
    this.overlayType = isCorrect ? 'correct' : 'incorrect';
    this.showOverlay = true;

    if (isCorrect) {
      this.playCorrectSound();
      this.score++;                                   // user clicked AI on AI OR Not-AI on Not-AI
    } else {
      this.playIncorrectSound();
    }

    // Wait 1 second before proceeding to next question
    setTimeout(() => {
      this.showOverlay = false;
      this.isProcessingAnswer = false;

      this.current++;
      if (this.current < 7) {
        this.startTimer();
      } else {
        this.ended.emit(this.score);
      }
    }, 1000);
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
