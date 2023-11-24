import { Currency } from '../src/Currency'
import { BankBuilder } from '../src/BankBuilder'
describe('BankBuilder', function () {
  test('build a bank', () => {
    const bank = BankBuilder.aBank()
      .withPivotCurrency(Currency.EUR)
      .withExchangeRate(Currency.USD, 1.2)
      .build()

    expect(bank).not.toBeNull()
  })

  test('build a bank without pivot currency', () => {
    const bank = () => BankBuilder.aBank()
      .withExchangeRate(Currency.USD, 1.2)
      .build()

    expect(bank).toThrow('Pivot currency is mandatory')
  })

  test('build a bank without exchange rate', () => {
    const bank = () => BankBuilder.aBank()
      .withPivotCurrency(Currency.EUR)
      .build()

    expect(bank).not.toThrow()
  })
})
