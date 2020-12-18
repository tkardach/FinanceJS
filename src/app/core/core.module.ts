import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { FormsModule } from '@angular/forms';
import { AccountModule } from '../modules/account/account.module';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MaterialModule } from '../material/material.module';
import { CreateAccountPageComponent } from './components/create-account-page/create-account-page.component';
import { RouterModule } from '@angular/router';
import { AccountPredictionPageComponent } from './components/account-prediction-page/account-prediction-page.component';


const components = [
  HeaderComponent, 
  FooterComponent,  
  AccountPageComponent,
  HomePageComponent,
  NavComponent,
  CreateAccountPageComponent
];


@NgModule({
  declarations: [
    ...components,
    AccountPredictionPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccountModule,
    SharedModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    ...components
  ]
})
export class CoreModule { }
