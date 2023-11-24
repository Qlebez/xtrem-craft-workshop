import { Bank } from '../src/Bank'
import { Money } from '../src/Money'
import { Currency } from '../src/Currency'
import { BankBuilder } from '../src/BankBuilder'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'

describe('Bank', function () {
  test('convert from eur to usd returns number', () => {
    const bank = BankBuilder.aBank()
      .withPivotCurrency(Currency.EUR)
      .withExchangeRate(Currency.USD, 1.2)
      .build()
    const money = bank.convertMoney(Money.create(10, Currency.EUR), Currency.USD)

    expect(money).toEqual(Money.create(12, Currency.USD))
  })

  test('convert from eur to eur returns same value', () => {
    const bank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).withExchangeRate(Currency.USD, 1.2).build()
    const money = bank.convertMoney(Money.create(10, Currency.EUR), Currency.EUR)

    expect(money).toEqual(Money.create(10, Currency.EUR))
  })

  test('convert throws error in case of missing exchange rates', () => {
    const bank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).withExchangeRate(Currency.USD, 1.2).build()
    const money = () => bank.convertMoney(Money.create(10, Currency.EUR), Currency.KRW)

    expect(money)
      .toThrow(MissingExchangeRateError)
  })

  test('convert with different exchange rates returns different numbers', () => {
    const bank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).withExchangeRate(Currency.USD, 1.2).build()
    const money = bank.convertMoney(Money.create(10, Currency.EUR), Currency.USD)

    bank.addExchangeRate(Currency.USD, 1.5)
    const money2 = bank.convertMoney(Money.create(10, Currency.EUR), Currency.USD)

    expect(money2._amount).toBeGreaterThan(money._amount)
  })

  test('test the separator of the error message', () => {
    const bank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).withExchangeRate(Currency.USD, 1.2).build()
    const money = () => bank.convertMoney(Money.create(10, Currency.EUR), Currency.KRW)

    expect(money)
      .toThrow(MissingExchangeRateError)
    expect(money)
      .toThrow('EUR-> KRW')
  })

  test('test the bank has a pivot currency', () => {
    const bank = () => new Bank(null)

    expect(bank).toThrow('Pivot currency is mandatory')
  })
})
