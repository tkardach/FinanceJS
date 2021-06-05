import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './predict-page-intro-dialog',
    templateUrl: './predict-page-intro-dialog.html',
    styleUrls: ['./predict-page-intro-dialog.css']
  })
  export class PredictPageIntroDialog {
  
    constructor(
      public dialogRef: MatDialogRef<PredictPageIntroDialog>) {}
  
  }