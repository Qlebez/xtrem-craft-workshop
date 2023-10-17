import { Currency } from "../src/Currency";
import { Bank } from "../src/Bank";
import { Portfolio } from "../src/Portfolio";

describe('Portfolio', function () {

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

        const bank = new Bank();
        const amount = portfolio.evaluate(Currency.EUR, bank);

        expect(amount).toBe(110);
    });

    test('Portfolio monnaie différente => Eur' , () => {
        const portfolio = new Portfolio();

        portfolio.addAmount(10, Currency.EUR);
        portfolio.addAmount(10, Currency.USD);

        const bank = Bank.withExchangeRate(Currency.USD, Currency.EUR, 1.2);
        const amount = portfolio.evaluate(Currency.EUR, bank);

        expect(amount).toBe(22);
    });

    test('Portfolio has not the exchange rate', () => {
        const portfolio = new Portfolio();

        portfolio.addAmount(10, Currency.EUR);
        portfolio.addAmount(10, Currency.USD);

        const bank = new Bank();
        const evaluation = () => portfolio.evaluate(Currency.EUR, bank);

        expect(evaluation).toThrowError();
    });

    test('Portfolio has negative money', () => {
        const portfolio = new Portfolio();

        portfolio.addAmount(-10, Currency.EUR);
        portfolio.addAmount(-10, Currency.EUR);

        const bank = new Bank();
        const amount = portfolio.evaluate(Currency.EUR, bank);

        expect(amount).toBe(-20);
    })
})
