import { Component, EventEmitter, Output } from '@angular/core';
import { SoundFxService } from '../../services/sound-fx.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Output() start = new EventEmitter<void>();
  
  constructor(private soundFx: SoundFxService) {}

  playClickSound() {
    this.soundFx.playClickSound();
  }
}
