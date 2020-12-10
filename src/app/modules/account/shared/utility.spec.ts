
import { Currency } from './account.model';
import { getAmountString } from './utility';

describe('account/shared/utility', () => {
    describe('getAmountString()', () => {
        it('should handle values correctly', () => {
            let num = 34.5e12;
            let expectedString = '$34,500,000,000,000.00';
            expect(getAmountString(num, Currency.USD)).toBe(expectedString);
            num = 34515016270000.50;
            expectedString = '$34,515,016,270,000.50';
            expect(getAmountString(num, Currency.USD)).toBe(expectedString);
            num = 34515016270000.50;
            expectedString = '$34,515,016,270,000.50';
            expect(getAmountString(num, Currency.USD)).toBe(expectedString);
        });
    });
});  