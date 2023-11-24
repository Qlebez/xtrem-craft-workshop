import { Money } from './Money'
import { Currency } from './Currency'
import { MissingExchangeRateError } from './MissingExchangeRateError'

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()
  private readonly _pivotCurrency: Currency

  /**
   * @param currency : Currency
   * @param rate :  number
   */
  addExchangeRate (currency: Currency, rate: number): void {
    this._exchangeRates.set(currency, rate)
  }

  /**
  * @param money : Money
  * @param to : Currency
  */
  canConvert (money: Money, to: Currency): boolean {
    return money.hasCurrency(to) || this._exchangeRates.has(to)
  }

  /**
   * @param money : Money
   * @param to : Currency
   * @returns Money
   */
  convertMoney (money: Money, to: Currency): Money {
    if (this.canConvert(money, to)) {
      return money.hasCurrency(to)
        ? money
        : money.convert(this._exchangeRates.get(to), to)
    }
    throw new MissingExchangeRateError(money._currency, to)
  }

  /**
  * @param pivotCurrency : Currency
  */
  constructor (pivotCurrency: Currency) {
    if (pivotCurrency == null) {
      throw new Error('Pivot currency is mandatory')
    }

    this._pivotCurrency = pivotCurrency
  }
}
