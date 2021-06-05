import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './transaction-deleted-dialog',
    templateUrl: './transaction-deleted-dialog.html',
    styleUrls: ['./transaction-deleted-dialog.css']
  })
  export class TransactionDeletedDialog {
  
    constructor(
      public dialogRef: MatDialogRef<TransactionDeletedDialog>) {}
  
  }