import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './create-income-intro-dialog',
    templateUrl: './create-income-intro-dialog.html',
    styleUrls: ['./create-income-intro-dialog.css']
  })
  export class CreateIncomeIntroDialog {
  
    constructor(
      public dialogRef: MatDialogRef<CreateIncomeIntroDialog>) {}
  
  }