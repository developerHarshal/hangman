import { Component } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HangmanService } from '../services/hangman.service';

// interface Letter{
//   letter: string;
//   selected: boolean; 
// }

// interface WordComponentVm{
//   wordLetters: Letter[];
// }

@Component({
  selector: 'hm-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent {
  // vm$: BehaviorSubject<WordComponentVm>;
  constructor(public hangmanService: HangmanService){}

  ngOnInit(){
    // vm$ = of(this.hangmanService.word.value.)
    // const vm : WordComponentVm = {wordLetters: []} as WordComponentVm; 
    // for(let i =0; i< this.hangmanService.word.value.length; i++){

    // }
  }
}
