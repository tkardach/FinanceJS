import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/modules/account/shared/account.model';
import { Transaction } from 'src/app/modules/account/shared/transaction.model';
import { ResponsiveService } from 'src/app/shared/responsive.service';

@Component({
  selector: 'app-account-prediction-page',
  templateUrl: './account-prediction-page.component.html',
  styleUrls: ['./account-prediction-page.component.css']
})
export class AccountPredictionPageComponent implements OnInit {
  isMobile: boolean;
  transactions: Transaction[];
  account: Account;
  selectedDate: Date;

  constructor(
    private responsiveService: ResponsiveService) { }

  ngOnInit(): void {

    this.onResize();
  }

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile
    });
  }

  onEditTransaction(transaction: Transaction) {
    
  }

  onEditAccount(account: Account) {

  }
}
