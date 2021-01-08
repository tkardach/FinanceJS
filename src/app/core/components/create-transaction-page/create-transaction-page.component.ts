import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { Timespan, Transaction } from 'src/app/modules/account/shared/transaction.model';
import { ConfigurationService } from 'src/app/shared/configuration.service';
import { CreateIncomeIntroDialog } from '../dialogs/create-income-intro-dialog';
import { CreateSpendingIntroDialog } from '../dialogs/create-spending-intro-dialog';
import { CreateBalanceIntroDialog } from '../dialogs/create-balance-intro-dialog';

@Component({
  selector: 'app-create-transaction-page',
  templateUrl: './create-transaction-page.component.html',
  styleUrls: ['./create-transaction-page.component.css']
})
export class CreateTransactionPageComponent implements OnInit {
  transactionName: string;
  transactionTitle: string;
  transactionRecurrence: Timespan;
  transactionDate: Date;
  transactionAmount: number;

  amountPositive: boolean = true;

  constructor(
    private configurationService: ConfigurationService,
    private accountService: AccountService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    // Check if an account exists
    const accounts = await this.accountService.getAccounts().toPromise();
    if (accounts.length === 0) this.router.navigate(['/create-account']);
    else {
      // if an account does exist, check if the current account is among the existing accounts
      const account = await this.accountService.getAccount(this.configurationService.currentAccount).toPromise();

      // if it doesn't exist, use an existing account
      if (!account) this.configurationService.currentAccount = accounts[0].id;
    }

    // If going through tutorial, setup instructions
    if (this.configurationService.balanceFirstUse) {
      this.transactionName = "My Balance"
      this.transactionTitle = "How much money do you currently have?";
      this.transactionRecurrence = Timespan.Once;
      this.transactionDate = new Date();
      this.transactionAmount = 0;
      this.cdRef.detectChanges();
      this.dialog.open(CreateBalanceIntroDialog);
    } else if (this.configurationService.incomeFirstUse) {
      this.transactionName = "My Income"
      this.transactionTitle = "How much money do you make in a month?";
      this.transactionRecurrence = Timespan.Monthly;
      this.transactionDate = new Date();
      this.transactionAmount = 500;
      this.cdRef.detectChanges();
      this.dialog.open(CreateIncomeIntroDialog);
    } else if (this.configurationService.spendingFirstUse) {
      this.transactionName = "My Spending"
      this.transactionTitle = "How much money do you spend in a month?";
      this.transactionRecurrence = Timespan.Monthly;
      this.transactionDate = new Date();
      this.transactionAmount = -500;
      this.cdRef.detectChanges();
      this.dialog.open(CreateSpendingIntroDialog);
    } else {
      // Navigate to predict page
      this.router.navigate(['predict']);
    }
  }

  onAmountChange(amount: number) {
    this.amountPositive = !amount || amount >= 0 ? true : false;
  }

  onTransactionCreate(transaction: Transaction) {
    this.accountService.createTransaction(
      this.configurationService.currentAccount, 
      transaction.name, 
      transaction.amount,
      transaction.date,
      transaction.recurrence).subscribe((id) => {
        // If tutorial is on, follow tutorial state machine
        if (this.configurationService.firstUse) {
          // If creating transaction for balance tutorial
          if (this.configurationService.balanceFirstUse) {
            this.configurationService.balanceFirstUse = false;
  
            // Navigate back to this page for spending tutorial
            if (this.configurationService.incomeFirstUse || this.configurationService.spendingFirstUse) {
              this.router.routeReuseStrategy.shouldReuseRoute =() => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate(['create-transaction']);
            }
            else  // otherwise, navigate to account page
              this.router.navigate(['predict'])
          }
          // If creating transaction for income tutorial
          else if (this.configurationService.incomeFirstUse) {
            this.configurationService.incomeFirstUse = false;
  
            // Navigate back to this page for spending tutorial
            if (this.configurationService.spendingFirstUse) {
              this.router.routeReuseStrategy.shouldReuseRoute =() => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate(['create-transaction']);
            }
            else  // otherwise, navigate to account page
              this.router.navigate(['predict'])
          } else if (this.configurationService.spendingFirstUse) {
            this.configurationService.spendingFirstUse = false;
            this.configurationService.firstUse = false;

            // Navigate to predict page
            this.router.navigate(['predict'])
          }
        }
      }, (error) => {
        // TODO handle transaction creation failure
      })
  }
}
