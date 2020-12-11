import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { AccountComponent } from './account/account.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { CurrencyToNumberPipe } from './shared/currency-to-number.pipe';

const components = [
  TransactionComponent,
  AccountBalanceComponent,
  AccountComponent,
  CreateTransactionComponent,
  CurrencyToNumberPipe
]

@NgModule({
  declarations: [
    ...components
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule
  ],
  providers: [AccountModule],
  exports: [
    ...components
  ]
})
export class AccountModule { }
