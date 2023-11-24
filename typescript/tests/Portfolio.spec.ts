import { Money } from '../src/Money'
import { Currency } from '../src/Currency'
import { Portfolio } from '../src/Portfolio'
import { BankBuilder } from '../src/BankBuilder'

describe('Portfolio', function () {
  test('Portfolio vide => Eur', () => {
    const portfolio = new Portfolio()

    const bank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).withExchangeRate(Currency.USD, 1.2).build()
    const amount = portfolio.evaluateMoney(Currency.EUR, bank)

    expect(amount).toEqual(Money.create(0, Currency.EUR))
  })

  test('Portfolio monnaie unique => Eur', () => {
    const portfolio = new Portfolio()

    portfolio.addMoney(Money.create(100, Currency.EUR))
    portfolio.addMoney(Money.create(10, Currency.EUR))

    const bank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).build()
    const money: Money = portfolio.evaluateMoney(Currency.EUR, bank)

    expect(money).toEqual(Money.create(110, Currency.EUR))
  })

  test('Portfolio monnaie différente => Eur', () => {
    const portfolio = new Portfolio()

    portfolio.addMoney(Money.create(10, Currency.EUR))
    portfolio.addMoney(Money.create(10, Currency.USD))

    const bank = BankBuilder.aBank().withPivotCurrency(Currency.USD).withExchangeRate(Currency.EUR, 1.2).build()
    const amount = portfolio.evaluateMoney(Currency.EUR, bank)

    expect(amount).toEqual(Money.create(22, Currency.EUR))
  })

  test('Portfolio has not the exchange rate', () => {
    const portfolio = new Portfolio()
    portfolio.addMoney(Money.create(10, Currency.EUR))
    portfolio.addMoney(Money.create(10, Currency.USD))

    const bank = BankBuilder.aBank().withPivotCurrency(Currency.KRW).build()
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const evaluation = () => portfolio.evaluateMoney(Currency.EUR, bank)

    expect(evaluation).toThrowError()
  })
})
