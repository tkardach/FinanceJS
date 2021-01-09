import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/modules/account/shared/account.model';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { Transaction } from 'src/app/modules/account/shared/transaction.model';
import { ConfigurationService } from 'src/app/shared/configuration.service';
import { ResponsiveService } from 'src/app/shared/responsive.service';
import { PredictPageIntroDialog } from '../dialogs/predict-page-intro-dialog';
import { ContinueTutorialDialog } from '../dialogs/continue-tutorial-dialog';
import { TutorialService } from 'src/app/shared/tutorial.service';
import { TutorialState } from 'src/app/shared/tutorial.model';

@Component({
  selector: 'app-account-prediction-page',
  templateUrl: './account-prediction-page.component.html',
  styleUrls: ['./account-prediction-page.component.css']
})
export class AccountPredictionPageComponent implements OnInit {
  isMobile: boolean;
  transactions: Transaction[];
  account: Account;

  tutorialState: TutorialState;
  continueTutorial: boolean;

  private _selectedDate = new Date();
  @Input() set selectedDate(date: Date) {
    this._selectedDate = date;
    this.onDateChange();
  }
  get selectedDate(): Date {
    return this._selectedDate;
  }

  constructor(
    private configurationService: ConfigurationService,
    private responsiveService: ResponsiveService,
    private accountService: AccountService,
    private tutorialService: TutorialService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) { 
      this.onResize();
      this.responsiveService.checkWidth();

      this.tutorialState = parseInt(this.route.snapshot.paramMap.get('tutorial'));
      this.continueTutorial = JSON.parse(this.route.snapshot.paramMap.get('continueTutorial'));
    }

  async ngOnInit(): Promise<void> {
    if (this.continueTutorial) {
      const dialogRef = this.dialog.open(ContinueTutorialDialog);
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        this.tutorialService.continueTutorial();
        return;
      } else {
        this.tutorialService.skipTutorial();
      }
    }
    
    const id = this.configurationService.currentAccount;
    if (id !== -1) {
      this.accountService.getAccount(id).subscribe(async account => {
        this.account = account;
        this.onDateChange();

        if (this.tutorialState === TutorialState.FirstPrediction) {
          const dialogRef = this.dialog.open(PredictPageIntroDialog);
          dialogRef.afterClosed().subscribe(() => { this.configurationService.predictFirstUse = false; })
        }
      }, error => {
        // TODO handle error
      });
    } else {
      this.router.navigate(['/create-account']);
      return;
    }
  }

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile
    });
  }

  onDateChange() {
    if (this.account) {
      this.accountService.getAccountTransactionsOnDate(this.account.id, this.selectedDate).subscribe(transactions => {
        this.transactions = transactions;
      }, error => {
        // TODO handle error
      })
    }
  }

  onEditTransaction(transaction: Transaction) {
    
  }

  onEditAccount(account: Account) {
    this.router.navigate(['/account'])
  }
}
