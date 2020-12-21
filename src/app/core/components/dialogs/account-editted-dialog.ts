import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './account-editted-dialog',
    templateUrl: './account-editted-dialog.html',
    styleUrls: ['./account-editted-dialog.css']
  })
  export class AccountEdittedDialog {
  
    constructor(
      public dialogRef: MatDialogRef<AccountEdittedDialog>) {}
  
  }