import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from 'src/app/modules/account/shared/transaction.model';

@Component({
    selector: './edit-transaction-form-dialog',
    templateUrl: './edit-transaction-form-dialog.html',
    styleUrls: ['./edit-transaction-form-dialog.css']
  })
  export class EditTransactionFormDialog {
    transaction: Transaction;

    constructor(
      public dialogRef: MatDialogRef<EditTransactionFormDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Transaction) {
        this.transaction = data;
    }
    
    onEdit(editTransaction: Transaction) {
      this.dialogRef.close(editTransaction);
    }
  }