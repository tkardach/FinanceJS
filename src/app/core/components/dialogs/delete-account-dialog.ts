import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './delete-account-dialog',
    templateUrl: './delete-account-dialog.html',
    styleUrls: ['./delete-account-dialog.css']
  })
  export class DeleteAccountDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteAccountDialog>) {}
  
  }