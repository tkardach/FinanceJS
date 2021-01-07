import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'src/app/modules/account/shared/account.model';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { Transaction } from 'src/app/modules/account/shared/transaction.model';
import { ConfigurationService } from 'src/app/modules/configuration/configuration.service';
import { ResponsiveService } from 'src/app/shared/responsive.service';
import { PredictPageIntroDialog } from '../dialogs/predict-page-intro-dialog';
import { ContinueTutorialDialog } from '../dialogs/continue-tutorial-dialog';

@Component({
  selector: 'app-account-prediction-page',
  templateUrl: './account-prediction-page.component.html',
  styleUrls: ['./account-prediction-page.component.css']
})
export class AccountPredictionPageComponent implements OnInit {
  isMobile: boolean;
  transactions: Transaction[];
  account: Account;

  private _selectedDate = new Date();
  @Input() set selectedDate(date: Date) {
    this._selectedDate = date;
    this.onDateChange();
  }
  get selectedDate(): Date {
    return this._selectedDate;
  }

  constructor(
    private configurationService: ConfigurationService,
    private responsiveService: ResponsiveService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private router: Router) { 
      this.onResize();
      this.responsiveService.checkWidth();
    }

  ngOnInit(): void {
    const id = this.configurationService.currentAccount;
    if (id !== -1) {
      this.accountService.getAccount(id).subscribe(async account => {
        this.account = account;
        this.onDateChange();

        if (this.configurationService.balanceFirstUse ||
            this.configurationService.incomeFirstUse ||
            this.configurationService.spendingFirstUse) {
          const dialogRef = this.dialog.open(ContinueTutorialDialog);
          const continueTutorial: boolean = await dialogRef.afterClosed().toPromise();
          if (continueTutorial) {
            this.router.navigate(['/create-transaction']);
            return;
          }
          else {
            this.configurationService.balanceFirstUse = 
            this.configurationService.incomeFirstUse = 
            this.configurationService.spendingFirstUse =
            this.configurationService.accountFirstUse = false;
          }
        }

        if (this.configurationService.predictFirstUse) {
          const dialogRef = this.dialog.open(PredictPageIntroDialog);
          dialogRef.afterClosed().subscribe(() => { this.configurationService.predictFirstUse = false; })
        }
      }, error => {
        // TODO handle error
      });
    } else {
      this.router.navigate(['/create-account']);
      return;
    }
  }

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile
    });
  }

  onDateChange() {
    if (this.account) {
      this.accountService.getAccountTransactionsOnDate(this.account.id, this.selectedDate).subscribe(transactions => {
        this.transactions = transactions;
      }, error => {
        // TODO handle error
      })
    }
  }

  onEditTransaction(transaction: Transaction) {
    
  }

  onEditAccount(account: Account) {
    this.router.navigate(['/account'])
  }
}
