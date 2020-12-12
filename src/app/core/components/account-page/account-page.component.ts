import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/modules/account/shared/account.model';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { Timespan, Transaction } from 'src/app/modules/account/shared/transaction.model';

enum AccountPageState {
  EditTransaction = 0,
  CreateTransaction = 1
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
  

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => {
        if (accounts.length > 0)
          this.account = accounts[0]
      }, error => {
        // TODO add logger
        console.log(error)
      })
  }

  onEditTransaction(transaction: Transaction) {
    this.editTransaction = transaction;
    this.state = AccountPageState.EditTransaction;
  }
}
