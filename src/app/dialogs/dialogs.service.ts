import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoAccountExistsDialog } from './no-account-exists-dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  showNoAccountExistsDialog() {
    this.dialog.open(NoAccountExistsDialog);
  }
}
