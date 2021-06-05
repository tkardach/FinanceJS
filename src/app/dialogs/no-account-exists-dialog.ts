import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './no-account-exists-dialog',
    templateUrl: './no-account-exists-dialog.html',
    styleUrls: ['./no-account-exists-dialog.css']
  })
  export class NoAccountExistsDialog {
  
    constructor(
      public dialogRef: MatDialogRef<NoAccountExistsDialog>) {
        dialogRef.disableClose = true;
      }
  }