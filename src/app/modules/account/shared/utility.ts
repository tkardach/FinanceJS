import { CurrencyPipe } from '@angular/common';
import { Currency } from './account.model';

export function getAmountString(amount: number, currency: Currency): string {
    switch (currency) {
        case Currency.CAD:
            return amount.toLocaleString('en-CA', { style: 'currency', currency: 'CAD'});
        case Currency.EUR:
            return amount.toLocaleString('en-GB', { style: 'currency', currency: 'EUR'});
        case Currency.JPY:
            return amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY'});
        case Currency.USD:
        default:
            return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD'});   
    }
}

export function getNumberFromCurrencyString(str: string): number {
    if (!str) return 0;
    return Number(str.toString().replace(/[^0-9.-]+/g,""))
}

export function getCurrencyType(currency: Currency): string {
    switch (currency) {
        case Currency.CAD:
            return "CAD"
        case Currency.EUR:
            return "EUR"
        case Currency.JPY:
            return "JPY"
        case Currency.USD:
        default:
            return "USD"
    }
}

export function getCurrencyString(currency: Currency): string {
    switch (currency) {
        case Currency.CAD:
            return "CA$ (CAD)"
        case Currency.EUR:
            return "€ (EUR)"
        case Currency.JPY:
            return "¥ (JPY)"
        case Currency.USD:
        default:
            return "$ (USD)"
    }
}