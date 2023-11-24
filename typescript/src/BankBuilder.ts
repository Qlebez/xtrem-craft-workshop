import { Bank } from './Bank'
import { Currency } from './Currency'

export class BankBuilder {
  pivotCurrency: Currency
  private readonly exchangeRates: Array<{ currency: Currency, rate: number }> = []

  static aBank (): BankBuilder {
    return new BankBuilder()
  }

  withPivotCurrency (currency: Currency): BankBuilder {
    this.pivotCurrency = currency
    return this
  }

  withExchangeRate (currency: Currency, rate: number): BankBuilder {
    this.exchangeRates.push({ currency: currency, rate: rate })
    return this
  }

  build (): Bank {
    const bank = new Bank(this.pivotCurrency)

    for (let i = 0; i < this.exchangeRates.length; i++) {
      bank.addExchangeRate(this.exchangeRates[i].currency, this.exchangeRates[i].rate)
      bank.addExchangeRate(this.pivotCurrency, 1 / this.exchangeRates[i].rate)
    }
    return bank
  }
}
