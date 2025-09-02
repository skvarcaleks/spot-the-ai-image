import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SoundFxService } from '../../services/sound-fx.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() lang: 'sl' | 'en' = 'sl';
  @Output() start = new EventEmitter<void>();
  @Output() languagePicked = new EventEmitter<'sl' | 'en'>();

  constructor(private soundFx: SoundFxService) { }

  playClickSound() {
    this.soundFx.playClickSound();
  }

  pickLanguage(lang: 'sl' | 'en') {
    this.languagePicked.emit(lang);
  }
}
