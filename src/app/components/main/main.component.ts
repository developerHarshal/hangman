import { Component } from '@angular/core';
import { HangmanService } from '../services/hangman.service';

@Component({
  selector: 'hm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(public hangmanService: HangmanService) {}

  changeWord() {
    this.hangmanService.reset();
  }

  getAnotherHint() {
    this.hangmanService.wordHintIndex += 1;
  }
}
