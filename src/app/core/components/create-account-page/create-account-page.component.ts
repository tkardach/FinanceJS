import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account, Currency } from 'src/app/modules/account/shared/account.model';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { ConfigurationService } from 'src/app/modules/configuration/configuration.service';
import { AccountAlreadyExistsDialog } from '../dialogs/account-already-exists-dialog';
import { CreateAccountIntroDialog } from '../dialogs/create-account-intro-dialog';
import { DeleteAccountDialog } from '../dialogs/delete-account-dialog';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})
export class CreateAccountPageComponent implements OnInit {
  accountName: string;
  accountTitle: string = "Create Account";
  accountCurrency: Currency;

  constructor(
    private configurationService: ConfigurationService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    const accounts = await this.accountService.getAccounts().toPromise();

    // If account exists, check if we should use this account
    if (accounts.length > 0) await this.accountExistsWorkflow();

    // If this is the first use, setup the tutorial for this page
    if (this.configurationService.firstUse && this.configurationService.accountFirstUse) {
      this.accountName = "My Checkings Account"
      this.accountTitle = "Where does your money go?";
      this.dialog.open(CreateAccountIntroDialog);
    }
  }

  async accountExistsWorkflow() {
    const dialogRef = this.dialog.open(AccountAlreadyExistsDialog);
    const useThisAccount: boolean = await dialogRef.afterClosed().toPromise();
    if (useThisAccount) {
      this.router.navigate(['create-transaction']);
    } else {
      const dialogRef = this.dialog.open(DeleteAccountDialog);
      const deleteAccount: boolean = await dialogRef.afterClosed().toPromise();
      if (deleteAccount) {
        const success: boolean = await this.accountService.deleteAccounts().toPromise();
        // TODO not successful workflow
      } else {
        // Recursive call until user decides what to do
        await this.accountExistsWorkflow();
      }
    }
  }

  onAccountCreate(account: Account) {
    this.accountService.createAccount(account.name, account.currency).subscribe((id) => {
      // On success, set current account id; turn off account first use, navigate to next page
      this.configurationService.currentAccount = id;
      this.configurationService.accountFirstUse = false;
      if (this.configurationService.firstUse)
        this.router.navigate(['create-transaction']);
      else 
        this.router.navigate(['prediction'])
    }, (error) => {
      // TODO handle account creation failure
    })
  }
}
