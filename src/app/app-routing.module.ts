import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountPageComponent } from './core/components/account-page/account-page.component';
import { AccountPredictionPageComponent } from './core/components/account-prediction-page/account-prediction-page.component';
import { CreateAccountPageComponent } from './core/components/create-account-page/create-account-page.component';
import { CreateTransactionPageComponent } from './core/components/create-transaction-page/create-transaction-page.component';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { TutorialGuard } from './shared/tutorial.guard';
import { AccountGuard } from './shared/account.guard';
import { CompositeRouteGuard } from './shared/composite-route.guard';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { 
    path: 'account', 
    component: AccountPageComponent, 
    canActivate: [ AccountGuard, TutorialGuard ]
  },
  { 
    path: 'create-account', 
    component: CreateAccountPageComponent, 
    canActivate: [TutorialGuard] 
  },
  { 
    path: 'create-transaction', 
    component: CreateTransactionPageComponent,
    data: { routeGuards: [AccountGuard, TutorialGuard] },
    canActivate: [ CompositeRouteGuard ]
  },
  { 
    path: 'predict', 
    component: AccountPredictionPageComponent, 
    data: { routeGuards: [AccountGuard, TutorialGuard] },
    canActivate: [ CompositeRouteGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
