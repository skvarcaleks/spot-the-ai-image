import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { SoundFxService } from '../../services/sound-fx.service';

@Component({
  selector: 'app-result',
  imports: [NgIf],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

  constructor(private soundFx: SoundFxService) {}

  @Input() lang: 'sl' | 'en' = 'sl';
  @Input() score!: number;   // 0-5
  @Output() goHome = new EventEmitter<void>();

  back() {
    this.lang = 'sl';
    this.goHome.emit();
  }

  playClickSound() {
    this.soundFx.playClickSound();
  }
}
