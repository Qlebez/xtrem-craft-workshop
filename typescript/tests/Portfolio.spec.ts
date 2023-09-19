import { Currency } from "../src/Currency";
import { Bank } from "../src/Bank";

describe('Portfolio', function () {

    class Portfolio {
       
        private readonly _amounts: Map<number, Currency> = new Map()

        evaluate(currency: Currency, bank: Bank): number {
            if (this._amounts.size === 0) { return 0; }

            let total: number = 0;

            this._amounts.forEach((currency_iter, number) => {

                if (currency_iter != currency) {
                    number = bank.convert(number, currency_iter, currency);
                }
                
                total += number;
            })

            return total;
        }

        addAmount(amount: number, currency: Currency) {
            this._amounts.set(amount, currency)
        }
    }

    test('Portfolio vide => Eur' , () => {
        const portfolio = new Portfolio();

        const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2);
        const amount = portfolio.evaluate(Currency.EUR, bank);

        expect(amount).toBe(0);
    });

    test('Portfolio monnaie unique => Eur' , () => {
        const portfolio = new Portfolio();

        portfolio.addAmount(100, Currency.EUR);
        portfolio.addAmount(10, Currency.EUR);

        const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2);
        const amount = portfolio.evaluate(Currency.EUR, bank);

        expect(amount).toBe(110);
    });

    test('Portfolio monnaie différente => Eur' , () => {
        const portfolio = new Portfolio();

        portfolio.addAmount(10, Currency.EUR);
        portfolio.addAmount(10, Currency.USD);

        const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2);
        const amount = portfolio.evaluate(Currency.EUR, bank);

        expect(amount).toBe(22);
    });
})
