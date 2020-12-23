import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/modules/account/shared/account.model';

@Component({
    selector: './edit-account-form-dialog',
    templateUrl: './edit-account-form-dialog.html',
    styleUrls: ['./edit-account-form-dialog.css']
  })
  export class EditAccountFormDialog {
    account: Account;

    constructor(
      public dialogRef: MatDialogRef<EditAccountFormDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Account) {
        this.account = data;
    }
    
    onEdit(editAccount: Account) {
      this.dialogRef.close(editAccount);
    }
  }