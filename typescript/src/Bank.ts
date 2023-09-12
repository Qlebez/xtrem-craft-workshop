import { Currency } from './Currency'
import { MissingExchangeRateError } from './MissingExchangeRateError'

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()

  /**
   * @param currency1 : Currency;
   * @param currency2 : Currency;
   * @param rate : number;
   */
  static withExchangeRate (currency1: Currency, currency2: Currency, rate: number): Bank {
    const bank = new Bank()
    bank.addExchangeRate(currency1, currency2, rate)
    return bank
  }

  /**
   * @param currency1 : Currency;
   * @param currency2 : Currency;
   * @param rate :  number;
   */
  addExchangeRate (currency1: Currency, currency2: Currency, rate: number): void {
    this._exchangeRates.set(currency1 + '->' + currency2, rate)
  }

  /**
   * @param firstCurrency : Currency;
   * @param secondCurrency : Currency;
   */
  canConvert (firstCurrency: Currency, secondCurrency: Currency): boolean {
    return firstCurrency === secondCurrency || this._exchangeRates.has(firstCurrency + '->' + secondCurrency)
  }

  /**
   * @param amount : number;
   * @param currency1 : Currency;
   * @param currency2 : Currency;
   */
  convert (amount: number, currency1: Currency, currency2: Currency): number {
    if (!this.canConvert(currency1, currency2)) { throw new MissingExchangeRateError(currency1, currency2) }

    return currency2 === currency1
      ? amount
      : amount * this._exchangeRates.get(currency1 + '->' + currency2)
  }
}
