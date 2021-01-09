import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Router } from '@angular/router';
import { TutorialState } from './tutorial.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(
    private configurationService: ConfigurationService,
    private router: Router) { }

  skipTutorial() {
    this.configurationService.removeTutorial(true);
  }

  continueTutorial() {
    if (this.configurationService.accountFirstUse)  
      this.router.navigate(['/create-account', {tutorial: TutorialState.CreateAccount}]);
    else if (this.configurationService.balanceFirstUse) 
      this.router.navigate(['/create-transaction', {tutorial: TutorialState.CreateBalance}]);
    else if (this.configurationService.incomeFirstUse) 
      this.router.navigate(['/create-transaction', {tutorial: TutorialState.CreateIncome}]);
    else if (this.configurationService.spendingFirstUse)  
      this.router.navigate(['/create-transaction', {tutorial: TutorialState.CreateSpending}]);
    else if (this.configurationService.predictFirstUse) 
      this.router.navigate(['/predict', {tutorial: TutorialState.FirstPrediction}]);
  }
}
