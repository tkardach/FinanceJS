import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountIntroDialog } from './create-account-intro-dialog';
import { AccountAlreadyExistsDialog } from './account-already-exists-dialog';
import { DeleteAccountDialog } from './delete-account-dialog';
import { CreateIncomeIntroDialog } from './create-income-intro-dialog';
import { CreateSpendingIntroDialog } from './create-spending-intro-dialog';
import { TransactionCreatedDialog } from './transaction-created-dialog';
import { TransactionEdittedDialog } from './transaction-editted-dialog';
import { AccountEdittedDialog } from './account-editted-dialog';
import { EditTransactionFormDialog } from './edit-transaction-form-dialog';
import { CreateTransactionFormDialog } from './create-transaction-form-dialog';
import { EditAccountFormDialog } from './edit-account-form-dialog';
import { CreateBalanceIntroDialog } from './create-balance-intro-dialog';
import { PredictPageIntroDialog } from './predict-page-intro-dialog';
import { ContinueTutorialDialog } from './continue-tutorial-dialog';
import { TransactionDeletedDialog } from './transaction-deleted-dialog';
import { TransactionsDeletedDialog } from './transactions-deleted-dialog';
import { DeleteTransactionDialog } from './delete-transaction-dialog';
import { DeleteTransactionsDialog } from './delete-transactions-dialog';
import { NoAccountExistsDialog } from './no-account-exists-dialog';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AccountModule } from '../modules/account/account.module';

const declared = [
  CreateAccountIntroDialog,
  AccountAlreadyExistsDialog,
  DeleteAccountDialog,
  CreateIncomeIntroDialog,
  CreateSpendingIntroDialog,
  TransactionCreatedDialog,
  TransactionEdittedDialog,
  AccountEdittedDialog,
  EditTransactionFormDialog,
  CreateTransactionFormDialog,
  EditAccountFormDialog,
  CreateBalanceIntroDialog,
  PredictPageIntroDialog,
  ContinueTutorialDialog,
  TransactionDeletedDialog,
  TransactionsDeletedDialog,
  DeleteTransactionDialog,
  DeleteTransactionsDialog,
  NoAccountExistsDialog
]

@NgModule({
  declarations: [
    ...declared
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    AccountModule
  ],
  exports: [
    ...declared
  ]
})
export class DialogsModule { }
