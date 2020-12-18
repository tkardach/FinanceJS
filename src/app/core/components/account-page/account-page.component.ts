import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/modules/account/shared/account.model';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { Timespan, Transaction } from 'src/app/modules/account/shared/transaction.model';
import { ResponsiveService } from 'src/app/shared/responsive.service';

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

  constructor(
    private accountService: AccountService,
    private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => {
        if (accounts.length > 0)
          this.account = accounts[0]
      }, error => {
        // TODO add logger
        console.log(error)
      })
    this.onResize();
  }

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile
    });
  }

  onEditAccount(account: Account) {
    this.state = AccountPageState.EditAccount;

    if (this.isMobile) {
    } else {
    }
  }

  onEditTransaction(transaction: Transaction) {
    this.editTransaction = transaction;
    this.state = AccountPageState.EditTransaction;
    
    if (this.isMobile) {
    } else {
    }
  }

  onCreateTransaction() {
    this.state = AccountPageState.CreateTransaction;
    
    if (this.isMobile) {
    } else {
    }
  }
}
