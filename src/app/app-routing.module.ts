import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountPageComponent } from './core/components/account-page/account-page.component';
import { AccountPredictionPageComponent } from './core/components/account-prediction-page/account-prediction-page.component';
import { CreateAccountPageComponent } from './core/components/create-account-page/create-account-page.component';
import { CreateTransactionPageComponent } from './core/components/create-transaction-page/create-transaction-page.component';
import { HomePageComponent } from './core/components/home-page/home-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'create-account', component: CreateAccountPageComponent },
  { path: 'create-transaction', component: CreateTransactionPageComponent },
  { path: 'predict', component: AccountPredictionPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
