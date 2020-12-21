import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/modules/account/shared/account.model';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { CreateTransaction, Timespan, Transaction } from 'src/app/modules/account/shared/transaction.model';
import { ConfigurationService } from 'src/app/modules/configuration/configuration.service';
import { ResponsiveService } from 'src/app/shared/responsive.service';
import { AccountEdittedDialog } from '../dialogs/account-editted-dialog';
import { TransactionCreatedDialog } from '../dialogs/transaction-created-dialog';
import { TransactionEdittedDialog } from '../dialogs/transaction-editted-dialog';

enum AccountPageState {
  EditTransaction = 0,
  CreateTransaction = 1,
  EditAccount = 2
}

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  account: Account;
  transactions: Transaction[];
  editTransaction: Transaction;
  state = AccountPageState.CreateTransaction;
  isMobile: boolean;

  private _positiveTransaction: boolean = true;
  set positiveTransaction(positive: boolean) {
    this._positiveTransaction = positive;
    this.cdRef.detectChanges();
  }
  get positiveTransaction(): boolean {
    return this._positiveTransaction || this.state === AccountPageState.EditAccount;
  }

  constructor(
    private configurationService: ConfigurationService,
    private accountService: AccountService,
    private responsiveService: ResponsiveService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef) { }

  async ngOnInit(): Promise<void> {
    const id = this.configurationService.currentAccount;
    if (id !== -1) {
      try {
        await this.getAccount();
        await this.getTransactionList();
      } catch {
        // TODO handle errors
      }
    }
    this.onResize();
  }

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile
    });
  }

  async getAccount() {
    const id = this.configurationService.currentAccount;
    try {
      this.account = await this.accountService.getAccount(id).toPromise();
    } catch {
      // TODO handle errors
    }
  }

  async getTransactionList() {
    try {
      const id = this.configurationService.currentAccount;
      this.transactions = await this.accountService.getTransactionsForAccount(id).toPromise();
    } catch {
      // TODO handle errors
    }
  }

  onTransactionAmountChange(amount: number) {
    this.positiveTransaction = amount >= 0;
  }

  onEditTransactionSelect(transaction: Transaction) {
    this.editTransaction = transaction;
    this.state = AccountPageState.EditTransaction;

    // TODO Enable dialogs for mobile version
    if (this.isMobile) {

    }
  }

  onEditAccountSelect(account: Account) {
    this.state = AccountPageState.EditAccount;
    
    // TODO Enable dialogs for mobile version
    if (this.isMobile) {
      
    }
  }

  onCreateTransactionSelect() {
    this.state = AccountPageState.CreateTransaction;
    
    // TODO Enable dialogs for mobile version
    if (this.isMobile) {
      
    }
  }

  onCreateTransaction(transaction: CreateTransaction) {
    this.accountService.createTransaction(
      this.account.id, 
      transaction.name, 
      transaction.amount,
      transaction.date,
      transaction.recurrence).subscribe(id => {
        const dialogRef = this.dialog.open(TransactionCreatedDialog);
        setTimeout(() => {
          this.getTransactionList();
          dialogRef.close();
        }, 2000);
      });
  }

  onEditTransaction(transaction: Transaction) {
    this.accountService.editTransaction(transaction).subscribe(store => {
        const dialogRef = this.dialog.open(TransactionEdittedDialog);
        setTimeout(() => {
          this.getTransactionList();
          dialogRef.close();
        }, 2000);
      });
  }

  onEditAccount(account: Account) {
    this.accountService.editAccount(account).subscribe(store => {
      const dialogRef = this.dialog.open(AccountEdittedDialog);
      setTimeout(() => {
        dialogRef.close();

      }, 2000);
    })
  }
}
