import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './delete-transaction-dialog',
    templateUrl: './delete-transaction-dialog.html',
    styleUrls: ['./delete-transaction-dialog.css']
  })
  export class DeleteTransactionDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteTransactionDialog>) {}
  
  }