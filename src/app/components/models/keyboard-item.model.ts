export interface IKeyboardItem{
    value: string;
    selected: boolean;
    isValid: boolean;
}

export class KeyboardItem implements IKeyboardItem{
    value ='';
    selected = false;
    isValid = false;

    constructor(value: string, selected = false, isValid = false){
        this.value = value;
        this.selected = selected;
        this.isValid = isValid;
    }
}