import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './transactions-deleted-dialog',
    templateUrl: './transactions-deleted-dialog.html',
    styleUrls: ['./transactions-deleted-dialog.css']
  })
  export class TransactionsDeletedDialog {
  
    constructor(
      public dialogRef: MatDialogRef<TransactionsDeletedDialog>) {}
  
  }