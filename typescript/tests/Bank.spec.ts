import { Bank } from '../src/Bank'
import { Money } from '../src/Money'
import { Currency } from '../src/Currency'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'

describe('Bank', function () {

  test('convert from eur to usd returns number', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money = bank.convertMoney(Money.create(10, Currency.EUR), Currency.USD)

    expect(money).toEqual(Money.create(12, Currency.USD))
  })

  test('convert from eur to eur returns same value', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money = bank.convertMoney(Money.create(10, Currency.EUR), Currency.EUR)

    expect(money).toEqual(Money.create(10, Currency.EUR))
  })

  test('convert throws error in case of missing exchange rates', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money = () => bank.convertMoney(Money.create(10, Currency.EUR), Currency.KRW)

    expect(money)
      .toThrow(MissingExchangeRateError)
  })

  test('convert with different exchange rates returns different numbers', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money = bank.convertMoney(Money.create(10, Currency.EUR), Currency.USD)
  
    bank.addExchangeRate(Currency.EUR, Currency.USD, 1.5)
    const money2 = bank.convertMoney(Money.create(10, Currency.EUR), Currency.USD)

    expect(money2._amount).toBeGreaterThan(money._amount)
  })

  test('test the separator of the error message', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money = () => bank.convertMoney(Money.create(10, Currency.EUR), Currency.KRW)

    expect(money)
      .toThrow(MissingExchangeRateError)
    expect(money)
      .toThrow('EUR-> KRW')
  })
})
