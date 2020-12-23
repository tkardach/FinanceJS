import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './create-balance-intro-dialog',
    templateUrl: './create-balance-intro-dialog.html',
    styleUrls: ['./create-balance-intro-dialog.css']
  })
  export class CreateBalanceIntroDialog {
  
    constructor(
      public dialogRef: MatDialogRef<CreateBalanceIntroDialog>) {}
  
  }