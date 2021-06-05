import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './account-already-exists-dialog',
    templateUrl: './account-already-exists-dialog.html',
    styleUrls: ['./account-already-exists-dialog.css']
  })
  export class AccountAlreadyExistsDialog {
  
    constructor(
      public dialogRef: MatDialogRef<AccountAlreadyExistsDialog>) {
        dialogRef.disableClose = true;
      }
  }