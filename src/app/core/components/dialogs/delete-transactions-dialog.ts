import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './delete-transactions-dialog',
    templateUrl: './delete-transactions-dialog.html',
    styleUrls: ['./delete-transactions-dialog.css']
  })
  export class DeleteTransactionsDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteTransactionsDialog>) {}
  
  }