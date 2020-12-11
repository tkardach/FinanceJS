import { Pipe, PipeTransform } from '@angular/core';
import { getNumberFromCurrencyString } from './utility';

@Pipe({
  name: 'currencyToNumber'
})
export class CurrencyToNumberPipe implements PipeTransform {

  transform(value: string): number {
    return getNumberFromCurrencyString(value);
  }

}
