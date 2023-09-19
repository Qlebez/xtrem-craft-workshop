import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'

describe('Bank', function () {

  test('convert from eur to usd returns number', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money = bank.convert(10, Currency.EUR, Currency.USD)

    expect(money).toBe(12)
  })

  test('convert from eur to eur returns same value', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money = bank.convert(10, Currency.EUR, Currency.EUR)

    expect(money).toBe(10)
  })

  test('convert throws error in case of missing exchange rates', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money = () => bank.convert(10, Currency.EUR, Currency.KRW)

    expect(money)
      .toThrow(MissingExchangeRateError)
  })

  test('convert with different exchange rates returns different numbers', () => {
    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const money = bank.convert(10, Currency.EUR, Currency.USD)
    
    bank.addExchangeRate(Currency.EUR, Currency.USD, 1.5)
    const money2 = bank.convert(10, Currency.EUR, Currency.USD)

    expect(money2).toBeGreaterThan(money)
  })
})
