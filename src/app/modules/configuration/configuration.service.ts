import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { Settings } from 'src/app/shared/shared.settings';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  @LocalStorage(Settings.WS_CONFIGURATION_FIRST_USE_INDEX, true)
  private _firstUse: boolean;

  public set firstUse(firstUse: boolean) {
    this._firstUse = firstUse;
  }
  public get firstUse(): boolean {
    return this._firstUse;
  }

  @LocalStorage(Settings.WS_CONFIGURATION_ACCOUNT_FIRST_USE_INDEX, true)
  private _accountFirstUse: boolean;

  public set accountFirstUse(accountFirstUse: boolean) {
    this._accountFirstUse = accountFirstUse;
  }
  public get accountFirstUse(): boolean {
    return this._accountFirstUse;
  }

  @LocalStorage(Settings.WS_CONFIGURATION_BALANCE_FIRST_USE_INDEX, true)
  private _balanceFirstUse: boolean;

  public set balanceFirstUse(balanceFirstUse: boolean) {
    this._balanceFirstUse = balanceFirstUse;
  }
  public get balanceFirstUse(): boolean {
    return this._balanceFirstUse;
  }

  @LocalStorage(Settings.WS_CONFIGURATION_INCOME_FIRST_USE_INDEX, true)
  private _incomeFirstUse: boolean;

  public set incomeFirstUse(incomeFirstUse: boolean) {
    this._incomeFirstUse = incomeFirstUse;
  }
  public get incomeFirstUse(): boolean {
    return this._incomeFirstUse;
  }

  @LocalStorage(Settings.WS_CONFIGURATION_SPENDING_FIRST_USE_INDEX, true)
  private _spendingFirstUse: boolean;

  public set spendingFirstUse(spendingFirstUse: boolean) {
    this._spendingFirstUse = spendingFirstUse;
  }
  public get spendingFirstUse(): boolean {
    return this._spendingFirstUse;
  }

  @LocalStorage(Settings.WS_CONFIGURATION_PREDICT_FIRST_USE_INDEX, true)
  private _predictFirstUse: boolean;

  public set predictFirstUse(predictFirstUse: boolean) {
    this._predictFirstUse = predictFirstUse;
  }
  public get predictFirstUse(): boolean {
    return this._predictFirstUse;
  }

  @LocalStorage(Settings.WS_CONFIGURATION_CURRENT_ACCOUNT_INDEX, -1)
  private _currentAccount: number;

  public set currentAccount(currentAccount: number) {
    this._currentAccount = currentAccount;
  }
  public get currentAccount(): number {
    return this._currentAccount;
  }

  removeTutorial(remove: boolean) {
    this._firstUse = this._accountFirstUse = this._incomeFirstUse = 
    this._spendingFirstUse = this._balanceFirstUse = this._predictFirstUse = !remove;
  }
  
  resetTutorial() {
    this._firstUse = this._accountFirstUse = this._incomeFirstUse = 
    this._spendingFirstUse = this._balanceFirstUse = this._predictFirstUse = true;
  }

  constructor() { }
}
