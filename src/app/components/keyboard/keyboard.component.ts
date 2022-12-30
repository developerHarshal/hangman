import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { KeyboardItem } from '../models/keyboard-item.model';
import { HangmanService } from '../services/hangman.service';

@Component({
  selector: 'hm-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardComponent {
  @Output() onKeyPressed: EventEmitter<KeyboardItem> = new EventEmitter();
  // letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(public hangmanService: HangmanService) {}

  onClick(letter: KeyboardItem) {
    this.hangmanService.selectLetter(letter);
    // console.log(letter);
    this.onKeyPressed.emit(letter);
  }
}
