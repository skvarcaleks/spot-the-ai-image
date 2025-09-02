import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HomeComponent, QuizComponent, ResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  state: 'home' | 'quiz' | 'result' = 'home';
  finalScore = 0;
  public title = 'AI, DA ALI NE?'
  public lang: 'sl' | 'en' = 'sl';

  onQuizEnded(score: number) {
    this.finalScore = score;
    this.state = 'result';
  }

  goHome() {
    this.lang = 'sl'; // Always reset to Slovenian
    this.state = 'home';
  }

  onLanguagePicked(lang: 'sl' | 'en') {
    this.lang = lang;
  }
}
