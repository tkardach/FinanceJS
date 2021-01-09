import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { TutorialState } from './tutorial.model';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class TutorialGuard implements CanActivate {
  constructor (
    private configurationService: ConfigurationService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Tutorial is deactivated, skip tutorial
    if (!this.configurationService.firstUse) return true;

    let continueTutorial: boolean = this.configurationService.balanceFirstUse ||
                                    this.configurationService.incomeFirstUse ||
                                    this.configurationService.spendingFirstUse;
                                    
    // Use tutorial flags to pass component states with route
    if (state.url === '/create-account') {
      if (this.configurationService.accountFirstUse)  // pass tutorial state
        this.router.navigate(['/create-account', {tutorial: TutorialState.CreateAccount}]);
      else  // continue to route
        return true;
    } else if (state.url === '/create-transaction') {
      if (this.configurationService.balanceFirstUse)  // pass balance state
        this.router.navigate(['/create-transaction', {tutorial: TutorialState.CreateBalance}]);
      else if (this.configurationService.incomeFirstUse)  // pass income state
        this.router.navigate(['/create-transaction', {tutorial: TutorialState.CreateIncome}]);
      else if (this.configurationService.spendingFirstUse)  // pass spending state
        this.router.navigate(['/create-transaction', {tutorial: TutorialState.CreateSpending}]);
      else  // redirect to predict, create-transaction is purely tutorial based page
        this.router.navigate(['/predict']);
    } else if (state.url ===  '/predict') {
      if (this.configurationService.predictFirstUse)  // pass prediction state
        this.router.navigate(['/predict', {tutorial: TutorialState.FirstPrediction, continueTutorial: continueTutorial}]);
      else  // navigate without tutorial
        this.router.navigate(['/predict', {continueTutorial: continueTutorial}]);
    } else if (state.url === '/account') {
      this.router.navigate(['/account', {continueTutorial: continueTutorial}]);
    } else {
      // No other tutorials
      return true;
    }
    
    // Pass through for tutorials, reject navigation
    return false;
  }
}
