import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountPageComponent } from './core/components/account-page/account-page.component';
import { CreateAccountPageComponent } from './core/components/create-account-page/create-account-page.component';
import { HomePageComponent } from './core/components/home-page/home-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'create-account', component: CreateAccountPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
