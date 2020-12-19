import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from '../modules/account/account.module';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MaterialModule } from '../material/material.module';
import { CreateAccountPageComponent } from './components/create-account-page/create-account-page.component';
import { RouterModule } from '@angular/router';
import { AccountPredictionPageComponent } from './components/account-prediction-page/account-prediction-page.component';
import { ConfigurationModule } from '../modules/configuration/configuration.module';
import { CreateAccountIntroDialog } from './components/dialogs/create-account-intro-dialog';
import { CreateTransactionPageComponent } from './components/create-transaction-page/create-transaction-page.component';
import { AccountAlreadyExistsDialog } from './components/dialogs/account-already-exists-dialog';
import { DeleteAccountDialog } from './components/dialogs/delete-account-dialog';
import { CreateIncomeIntroDialog } from './components/dialogs/create-income-intro-dialog';
import { CreateSpendingIntroDialog } from './components/dialogs/create-spending-intro-dialog';


const components = [
  HeaderComponent, 
  FooterComponent,  
  AccountPageComponent,
  HomePageComponent,
  NavComponent,
  CreateAccountPageComponent,
  AccountPredictionPageComponent,
  CreateAccountIntroDialog,
  AccountAlreadyExistsDialog,
  DeleteAccountDialog,
  CreateIncomeIntroDialog,
  CreateSpendingIntroDialog
];


@NgModule({
  declarations: [
    ...components,
    CreateTransactionPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccountModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    ConfigurationModule
  ],
  exports: [
    ...components
  ]
})
export class CoreModule { }
