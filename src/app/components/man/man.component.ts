import { Component, Input } from '@angular/core';
import { HangmanService } from '../services/hangman.service';

@Component({
  selector: 'hm-man',
  templateUrl: './man.component.html',
  styleUrls: ['./man.component.css'],
})
export class ManComponent {
  // @Input() errorCount: number = 0;
  constructor(public hangmanService: HangmanService) {}
}
