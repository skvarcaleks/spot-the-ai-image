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
  public title = 'AI ali ne?'

  onQuizEnded(score: number) {
    this.finalScore = score;
    this.state = 'result';
  }
}
