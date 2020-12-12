import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Settings } from './shared.settings';
import { DBConfig, NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';
import { EnumToArrayPipe } from './enum-to-array.pipe';

export function migrationFactory() {
  return {
  };
}

const dbConfig: DBConfig = {
  name: Settings.DB_NAME,
  version: 1,
  objectStoresMeta: [{
    store: Settings.DB_ACCOUNT_STORE,
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: Settings.DB_ACCOUNT_NAME_INDEX, 
        keypath: Settings.DB_ACCOUNT_NAME_INDEX, 
        options: { unique: false } },
      { name: Settings.DB_ACCOUNT_CURRENCY_INDEX, 
        keypath: Settings.DB_ACCOUNT_CURRENCY_INDEX, 
        options: { unique: false } }
    ]
  }, {
    store: Settings.DB_TRANSACTION_STORE,
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: Settings.DB_TRANSACTION_NAME_INDEX, 
        keypath: Settings.DB_TRANSACTION_NAME_INDEX, 
        options: { unique: false } },
      { name: Settings.DB_TRANSACTION_ACCOUNT_INDEX, 
        keypath: Settings.DB_TRANSACTION_ACCOUNT_INDEX, 
        options: { unique: false } },
      { name: Settings.DB_TRANSACTION_AMOUNT_INDEX, 
        keypath: Settings.DB_TRANSACTION_AMOUNT_INDEX, 
        options: { unique: false } },
      { name: Settings.DB_TRANSACTION_DATE_INDEX, 
        keypath: Settings.DB_TRANSACTION_DATE_INDEX, 
        options: { unique: false } },
      { name: Settings.DB_TRANSACTION_RECURRENCE_INDEX, 
        keypath: Settings.DB_TRANSACTION_RECURRENCE_INDEX, 
        options: { unique: false } }
    ]
  }],
  migrationFactory
}

@NgModule({
  declarations: [
    EnumToArrayPipe
  ],
  imports: [
    CommonModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [
    NgxIndexedDBService
  ],
  exports: [
    EnumToArrayPipe
  ]
})
export class SharedModule {}
