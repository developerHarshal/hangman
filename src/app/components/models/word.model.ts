export interface IWord {
  value: string;
  hints: string[];
}

export class Word implements IWord {
  value = '';
  hints = [] as string[];

  constructor(value: string, hints: string[]) {
    this.value = value;
    this.hints = hints;
  }
}
