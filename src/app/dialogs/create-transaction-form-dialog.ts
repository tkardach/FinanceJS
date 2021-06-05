import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateTransaction } from 'src/app/modules/account/shared/transaction.model';

@Component({
    selector: './create-transaction-form-dialog',
    templateUrl: './create-transaction-form-dialog.html',
    styleUrls: ['./create-transaction-form-dialog.css']
  })
  export class CreateTransactionFormDialog {
    transaction: CreateTransaction;

    constructor(
      public dialogRef: MatDialogRef<CreateTransactionFormDialog>) {
    }
    
    onCreate(createTransaction: CreateTransaction) {
      this.dialogRef.close(createTransaction);
    }
  }