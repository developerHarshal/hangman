import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Word } from '../models/word.model';

interface HintApiResponse {
  score: number;
  tags: string[];
  word: string;
}

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private wordUrl = 'https://random-word-api.herokuapp.com/word';
  private hintUrl = 'https://api.datamuse.com/words?ml=';
  constructor(private httpClient: HttpClient) {}

  getWord(): Observable<string> {
    const res = this.httpClient.get<string[]>(this.wordUrl);
    return res.pipe(map((word) => word[0]));
    // res.subscribe((word) => word[0]);
    // return res[0];
  }

  getHint(word: string): Observable<HintApiResponse[]> {
    const res = this.httpClient.get<HintApiResponse[]>(this.hintUrl + word);
    // res.subscribe((words) =>
    //   console.log(words[Math.floor(Math.random() * words.length)])
    // );
    return res.pipe(
      map((words) => words)
      // map((words) => words[Math.floor(Math.random() * words.length)])
    );
  }

  getWordWithHint(): Observable<Word> {
    return this.getWord().pipe(
      concatMap((retWord) => {
        return this.getHint(retWord).pipe(
          map(
            (hintRes) =>
              new Word(retWord.toUpperCase(), [...hintRes.map((w) => w.word)])
          )
        );
      })
    );
  }
}
