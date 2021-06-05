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
import { CreateTransactionPageComponent } from './components/create-transaction-page/create-transaction-page.component';
import { DialogsModule } from '../dialogs/dialogs.module';


const components = [
  HeaderComponent, 
  FooterComponent,  
  AccountPageComponent,
  HomePageComponent,
  NavComponent,
  CreateAccountPageComponent,
  AccountPredictionPageComponent,
  CreateTransactionPageComponent
];


@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccountModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    DialogsModule
  ],
  exports: [
    ...components
  ]
})
export class CoreModule { }
