import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: './create-account-intro-dialog',
    templateUrl: './create-account-intro-dialog.html',
    styleUrls: ['./create-account-intro-dialog.css']
  })
  export class CreateAccountIntroDialog {
  
    constructor(
      public dialogRef: MatDialogRef<CreateAccountIntroDialog>) {}
  
  }