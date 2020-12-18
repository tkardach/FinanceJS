import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Currency } from 'src/app/modules/account/shared/account.model';
import { ConfigurationService } from 'src/app/modules/configuration/configuration.service';
import { CreateAccountIntroDialog } from '../dialogs/create-account-intro-dialog';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})
export class CreateAccountPageComponent implements OnInit {
  accountName: string;
  accountTitle: string;
  accountCurrency: Currency;

  constructor(
    private configurationService: ConfigurationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.configurationService.firstUse) {
      this.dialog.open(CreateAccountIntroDialog);
      this.accountName = "My Checkings Account"
      this.accountTitle = "Where does your money go?";
    }
  }

}
