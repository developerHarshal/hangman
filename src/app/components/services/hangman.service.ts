import { Component, Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeyboardItem } from '../models/keyboard-item.model';
import { Word } from '../models/word.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogComponent } from '../shared-components/dialog/dialog.component';
import { WordService } from './word.service';

interface ILetter {
  value: string;
  selected: boolean;
}

class Letter implements ILetter {
  value = '';
  selected = false;
  constructor(value: string, selected = false) {
    this.value = value;
    this.selected = selected;
  }
}

@Injectable({
  providedIn: 'root',
})
export class HangmanService {
  // selectedLetters: BehaviorSubject<>
  private letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  lettersList!: KeyboardItem[];

  word!: Word;
  wordLetters!: Letter[];
  wordHintIndex = 0;
  wordChanged: BehaviorSubject<Word> = new BehaviorSubject<Word>(
    new Word('', [])
  );

  maxErrorCount = 7;
  currentErrorCount = 0;

  constructor(public dialog: MatDialog, private wordService: WordService) {
    // this.wordService.getWordWithHint().subscribe((word) => console.log(word));
    if (!this.lettersList?.length) {
      this.lettersList = [];
      this.letters.forEach((letter) => {
        this.lettersList.push(new KeyboardItem(letter));
      });
    }

    if (!this.word) {
      ////////////////////// STATIC WORD /////////////
      //   this.word = new Word('TEACHER', ['PROFESSION']);
      //   this.wordChanged.next(this.word);
      //   this.wordLetters = [];
      //   for (let i = 0; i < this.word.value.length; i++) {
      //     this.wordLetters.push(new Letter(this.word.value.charAt(i)));
      //   }

      ///////////////// Actual API ///////////////////////////////////////////
      this.wordService.getWordWithHint().subscribe((word) => {
        console.log(word);
        this.word = word;
        this.wordChanged.next(word);
        this.wordLetters = [];
        for (let i = 0; i < this.word.value.length; i++) {
          this.wordLetters.push(new Letter(this.word.value.charAt(i)));
        }
        this.currentErrorCount = 0;
        this.wordHintIndex = 0;
      });
    }
  }

  selectLetter(letter: KeyboardItem) {
    letter.selected = true;
    const isValid = this.word.value.includes(letter.value);
    letter.isValid = isValid;

    if (isValid) {
      this.wordLetters.forEach((wordLetter) => {
        if (wordLetter.value == letter.value) {
          wordLetter.selected = true;
        }
      });
      if (this.checkIfAllValid()) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '500px',
          height: 'auto',
          data: { isSuccess: true },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          this.reset();
        });
      }
    } else {
      this.currentErrorCount++;
      if (this.currentErrorCount === this.maxErrorCount) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '500px',
          height: 'auto',
          data: { isSuccess: false, correctWord: this.word.value },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          this.reset();
        });
      }
    }
  }

  checkIfAllValid(): boolean {
    return this.wordLetters.every((letter) => letter.selected);
  }

  reset() {
    /////////////// Static WOrd //////////////////////////////////////////
    // this.wordChanged.next(new Word('', []));
    // this.word = new Word('TEACHER', ['PROFESSION']);
    // this.wordChanged.next(this.word);

    // this.currentErrorCount = 0;
    // this.wordHintIndex = 0;
    // this.lettersList.forEach((letter) => {
    //   letter.selected = false;
    //   letter.isValid = false;
    // });
    // this.wordLetters = [];
    // for (let i = 0; i < this.word.value.length; i++) {
    //   this.wordLetters.push(new Letter(this.word.value.charAt(i)));
    // }

    /////////////// Actual API Calls /////////////////////////
    this.wordChanged.next(new Word('', []));
    this.wordService.getWordWithHint().subscribe((word) => {
      console.log(word);
      this.word = word;
      this.wordChanged.next(word);
      this.wordLetters = [];
      for (let i = 0; i < this.word.value.length; i++) {
        this.wordLetters.push(new Letter(this.word.value.charAt(i)));
      }
      this.currentErrorCount = 0;
      this.wordHintIndex = 0;
      this.lettersList.forEach((letter) => {
        letter.selected = false;
        letter.isValid = false;
      });
    });
  }
}
