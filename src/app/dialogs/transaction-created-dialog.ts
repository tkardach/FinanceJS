import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './transaction-created-dialog',
    templateUrl: './transaction-created-dialog.html',
    styleUrls: ['./transaction-created-dialog.css']
  })
  export class TransactionCreatedDialog {
  
    constructor(
      public dialogRef: MatDialogRef<TransactionCreatedDialog>) {}
  
  }