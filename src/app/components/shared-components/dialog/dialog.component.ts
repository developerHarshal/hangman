import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  isSuccess: boolean;
}

@Component({
  selector: 'hm-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  message = '';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (data.isSuccess) {
      this.message = 'Congratulations!!\n You have guessed it right!!';
    } else {
      this.message =
        'Better Luck next time!! \n You failed to guess the word!!';
    }
  }
  onClose() {
    this.dialogRef.close();
  }
}
