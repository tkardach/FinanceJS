import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account, Currency } from 'src/app/modules/account/shared/account.model';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { ConfigurationService } from 'src/app/shared/configuration.service';
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
    if (accounts.length > 0) {
      if (await this.useExistingAccount()) {
        this.router.navigate(['predict']);
        return;
      } else {
        this.configurationService.incomeFirstUse = this.configurationService.spendingFirstUse = true;
      }
    }
    // If this is the first use, setup the tutorial for this page
    if (this.configurationService.firstUse && this.configurationService.accountFirstUse) {
      this.accountName = "My Checkings Account"
      this.accountTitle = "Where does your money go?";
      this.dialog.open(CreateAccountIntroDialog);
    }
  }

  async useExistingAccount(): Promise<boolean> {
    const dialogRef = this.dialog.open(AccountAlreadyExistsDialog);
    // get result from dialog
    const useThisAccount: boolean = await dialogRef.afterClosed().toPromise();

    if (useThisAccount) {
      // user chose to continue with existing account
      return true;
    } else {
      // user chose to delete existing account
      const dialogRef = this.dialog.open(DeleteAccountDialog);
      const deleteAccount: boolean = await dialogRef.afterClosed().toPromise();
      if (deleteAccount) {
        const success: boolean = await this.accountService.deleteAccounts().toPromise();
        this.configurationService.currentAccount = -1;
        // TODO not successful workflow
        // return false, the user wants to start over
        return false;
      } else {
        // Recursive call until user decides what to do
        return await this.useExistingAccount();
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
        this.router.navigate(['predict'])
    }, (error) => {
      // TODO handle account creation failure
      console.log(error);
    })
  }
}
