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

  constructor() { }
}
