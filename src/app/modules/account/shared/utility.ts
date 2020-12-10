import { Currency } from './account.model';

export function getAmountString(amount: number, currency: Currency): string {
    switch (currency) {
        case Currency.CAD:
            return amount.toLocaleString('en-CA', { style: 'currency', currency: 'CAD'});
        case Currency.EUR:
            return amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR'});
        case Currency.JPY:
            return amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY'});
        case Currency.USD:
        default:
            return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD'});   
    }
}