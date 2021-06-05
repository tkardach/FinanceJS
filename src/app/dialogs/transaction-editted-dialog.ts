import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './transaction-editted-dialog',
    templateUrl: './transaction-editted-dialog.html',
    styleUrls: ['./transaction-editted-dialog.css']
  })
  export class TransactionEdittedDialog {
  
    constructor(
      public dialogRef: MatDialogRef<TransactionEdittedDialog>) {}
  
  }