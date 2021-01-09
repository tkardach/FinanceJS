import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { Timespan, Transaction } from 'src/app/modules/account/shared/transaction.model';
import { ConfigurationService } from 'src/app/shared/configuration.service';
import { CreateIncomeIntroDialog } from '../dialogs/create-income-intro-dialog';
import { CreateSpendingIntroDialog } from '../dialogs/create-spending-intro-dialog';
import { CreateBalanceIntroDialog } from '../dialogs/create-balance-intro-dialog';
import { TutorialState } from 'src/app/shared/tutorial.model';

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

  tutorialState: TutorialState;

  amountPositive: boolean = true;

  constructor(
    private configurationService: ConfigurationService,
    private accountService: AccountService,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { 
    this.router.routeReuseStrategy.shouldReuseRoute =() => false;
    this.router.onSameUrlNavigation = 'reload';

    this.tutorialState = parseInt(this.route.snapshot.paramMap.get('tutorial'));
  }

  async ngOnInit(): Promise<void> {
    // if an account does exist, check if the current account is among the existing accounts
    const account = await this.accountService.getAccount(this.configurationService.currentAccount).toPromise();

    // if it doesn't exist, redirect to create-account
    if (!account) this.router.navigate(['/create-account']);

    // If going through tutorial, setup instructions
    if (this.tutorialState === TutorialState.CreateBalance) {
      this.transactionName = "My Balance"
      this.transactionTitle = "How much money do you currently have?";
      this.transactionRecurrence = Timespan.Once;
      this.transactionDate = new Date();
      this.transactionAmount = 0;
      this.cdRef.detectChanges();
      this.dialog.open(CreateBalanceIntroDialog);
    } else if (this.tutorialState === TutorialState.CreateIncome) {
      this.transactionName = "My Income"
      this.transactionTitle = "How much money do you make in a month?";
      this.transactionRecurrence = Timespan.Monthly;
      this.transactionDate = new Date();
      this.transactionAmount = 500;
      this.cdRef.detectChanges();
      this.dialog.open(CreateIncomeIntroDialog);
    } else if (this.tutorialState === TutorialState.CreateSpending) {
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
        if (this.tutorialState === TutorialState.CreateBalance)
          this.configurationService.balanceFirstUse = false;
        if (this.tutorialState === TutorialState.CreateIncome)
          this.configurationService.incomeFirstUse = false;
        if (this.tutorialState === TutorialState.CreateSpending)
          this.configurationService.spendingFirstUse = false;

        // Reload page
        this.router.navigate(['create-transaction']);
      }, (error) => {
        // TODO handle transaction creation failure
      })
  }
}
