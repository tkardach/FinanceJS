import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/modules/account/shared/account.model';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { CreateTransaction, Transaction } from 'src/app/modules/account/shared/transaction.model';
import { ConfigurationService } from 'src/app/shared/configuration.service';
import { ResponsiveService } from 'src/app/shared/responsive.service';
import { AccountEdittedDialog } from '../dialogs/account-editted-dialog';
import { CreateTransactionFormDialog } from '../dialogs/create-transaction-form-dialog';
import { EditAccountFormDialog } from '../dialogs/edit-account-form-dialog';
import { EditTransactionFormDialog } from '../dialogs/edit-transaction-form-dialog';
import { TransactionCreatedDialog } from '../dialogs/transaction-created-dialog';
import { TransactionEdittedDialog } from '../dialogs/transaction-editted-dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ContinueTutorialDialog } from '../dialogs/continue-tutorial-dialog';
import { TutorialService } from 'src/app/shared/tutorial.service';
import { DeleteTransactionDialog } from '../dialogs/delete-transaction-dialog';
import { TransactionDeletedDialog } from '../dialogs/transaction-deleted-dialog';
import { TransactionsDeletedDialog } from '../dialogs/transactions-deleted-dialog';

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
  continueTutorial: boolean;
  editTransactions: boolean = false;
  selectedTransactions = {};

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
    private tutorialService: TutorialService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router) {
      this.onResize();
      this.responsiveService.checkWidth();

      this.continueTutorial = JSON.parse(this.route.snapshot.paramMap.get('continueTutorial'));
    }

  async ngOnInit(): Promise<void> {
    if (this.continueTutorial) {
      const dialogRef = this.dialog.open(ContinueTutorialDialog);
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        this.tutorialService.continueTutorial();
        return;
      } else {
        this.tutorialService.skipTutorial();
      }
    }

    const id = this.configurationService.currentAccount;
    if (id !== -1) {
      try {
        await this.getAccount();
        await this.getTransactionList();
      } catch {
        // TODO handle errors
      }
    } else {
      this.router.navigate(['/create-account']);
    }
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

      if (!this.account) {
        this.router.navigate(['/create-account']);
      }
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

  onSelectAllTransactions() {
    const selectAll = (acc, curr: Transaction) => {
      acc[curr.id] = true;
      return acc;
    }
    this.selectedTransactions = this.transactions.reduce(selectAll, {});
  }

  onDeselectAllTransactions() {
    this.selectedTransactions = {};
  }

  onDeleteSelectedTransactions() {
    const ids = Object.keys(this.selectedTransactions).filter(
      key => this.selectedTransactions[key]
    ).map(x => +x);
    this.accountService.deleteTransactions(ids).subscribe((list: Transaction[]) => {
      const dialogRef = this.dialog.open(TransactionsDeletedDialog);
      setTimeout(async () => {
        await this.getTransactionList();
        dialogRef.close();
      }, 2000);
    });
  }

  onEditTransactionSelect(transaction: Transaction) {
    if (this.editTransactions) {
      if (this.selectedTransactions[transaction.id])
        this.selectedTransactions[transaction.id] = !this.selectedTransactions[transaction.id];
      else
        this.selectedTransactions[transaction.id] = true;
      
      if (this.isMobile) return;
    }

    this.editTransaction = transaction;
    this.state = AccountPageState.EditTransaction;

    if (this.isMobile) {
      const dialogRef = this.dialog.open(EditTransactionFormDialog, {data: transaction});
      dialogRef.componentInstance.edit.subscribe((transaction: Transaction) => {
        dialogRef.close();
        this.onEditTransaction(transaction);
      });

      dialogRef.componentInstance.delete.subscribe((id: number) => {
        dialogRef.close();
        this.onDeleteTransaction(id);
      });
    }
  }

  onEditAccountSelect(account: Account) {
    this.state = AccountPageState.EditAccount;
    
    if (this.isMobile) {
      const dialogRef = this.dialog.open(EditAccountFormDialog, {data: account});
      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.onEditAccount(result);
      })
    }
  }

  onCreateTransactionSelect() {
    this.state = AccountPageState.CreateTransaction;
    
    if (this.isMobile) {
      const dialogRef = this.dialog.open(CreateTransactionFormDialog);
      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.onCreateTransaction(result);
      })
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
        setTimeout(async () => {
          location.reload();
          dialogRef.close();
        }, 2000);
      });
  }

  onEditTransaction(transaction: Transaction) {
    this.accountService.editTransaction(transaction).subscribe(store => {
        const dialogRef = this.dialog.open(TransactionEdittedDialog);
        setTimeout(async () => {
          await this.getTransactionList();
          dialogRef.close();
        }, 2000);
      });
  }
  
  onDeleteTransaction(id: number) {
    const dialogRef = this.dialog.open(DeleteTransactionDialog);
    dialogRef.afterClosed().subscribe(remove => {
      if (!remove) return;

      this.accountService.deleteTransaction(id).subscribe(store => {
        const dialogRef = this.dialog.open(TransactionDeletedDialog);
        setTimeout(async () => {
          await this.getTransactionList();
          this.state = AccountPageState.CreateTransaction;
          dialogRef.close();
        }, 2000);
      })
    })
  }

  onEditAccount(account: Account) {
    this.accountService.editAccount(account).subscribe(store => {
      const dialogRef = this.dialog.open(AccountEdittedDialog);
      setTimeout(async () => {
        await this.getAccount();
        dialogRef.close();
      }, 2000);
    })
  }
}
