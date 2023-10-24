import { Currency } from './Currency'
import { Money } from './Money'
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
   * @param money : money;
   * @param secondCurrency : Currency;
   */
  canConvert(money: Money, currency2: Currency) {
    return money.hasCurrency(currency2) || this._exchangeRates.has(this.getExchangeRate(money, currency2))
  }

  /**
   * @param money : Money;
   * @param to : Currency;
   * @returns Money;
   */
  convertMoney(money: Money, to: Currency): Money {
    if (!this.canConvert(money, to)) {
      throw new MissingExchangeRateError(money._currency, to)
    }

    return money.hasCurrency(to)
      ? money
      : money.convert(this._exchangeRates.get(this.getExchangeRate(money, to)), to)
  }

  private getExchangeRate(money: Money, currency2: Currency): string {
    return money._currency + '->' + currency2
  }
}
