import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';

const components = [
  TransactionComponent,
  AccountBalanceComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [AccountModule],
  exports: [
    ...components
  ]
})
export class AccountModule { }
