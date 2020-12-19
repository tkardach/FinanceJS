import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './create-spending-intro-dialog',
    templateUrl: './create-spending-intro-dialog.html',
    styleUrls: ['./create-spending-intro-dialog.css']
  })
  export class CreateSpendingIntroDialog {
  
    constructor(
      public dialogRef: MatDialogRef<CreateSpendingIntroDialog>) {}
  
  }