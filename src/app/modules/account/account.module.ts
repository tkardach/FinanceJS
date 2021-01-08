import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { AccountComponent } from './account/account.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyToNumberPipe } from './shared/currency-to-number.pipe';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';

const components = [
  TransactionComponent,
  AccountBalanceComponent,
  AccountComponent,
  CreateTransactionComponent,
  CurrencyToNumberPipe,
  EditTransactionComponent,
  CreateAccountComponent,
  EditAccountComponent,
  ViewTransactionComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AccountModule,
    CurrencyToNumberPipe
  ],
  exports: [
    ...components
  ]
})
export class AccountModule { }
