import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigurationService } from './configuration.service';
import { AccountService } from '../modules/account/shared/account.service';
import { DialogsService } from '../dialogs/dialogs.service';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {
  constructor(
    private configurationService: ConfigurationService,
    private accountService: AccountService,
    private router: Router,
    private dialogService: DialogsService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // If current account does not exist, redirect to create-account
    if (this.configurationService.currentAccount === -1) {
      this.dialogService.showNoAccountExistsDialog();
      this.router.navigate(['/create-account']);
      return false;
    }
    // If account exists, redirect to create-account
    return this.accountService.getAccount(this.configurationService.currentAccount)
      .pipe(map(data => {
        if (data) { // account exists
          return true;
        } else { // account does not exist, reset currentAccount and redirect
          this.configurationService.currentAccount = -1;
          this.router.navigate(['/create-account']);
          return false;
        }
      }));
  }
  
}
