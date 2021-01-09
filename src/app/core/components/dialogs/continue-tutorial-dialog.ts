import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './continue-tutorial-dialog',
    templateUrl: './continue-tutorial-dialog.html',
    styleUrls: ['./continue-tutorial-dialog.css']
  })
  export class ContinueTutorialDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ContinueTutorialDialog>) {
        dialogRef.disableClose = true;
    }
  }