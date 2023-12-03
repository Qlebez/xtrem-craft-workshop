import { Money } from './Money'
import { Bank } from './Bank'
import { Currency } from './Currency'

export class Portfolio {
  private readonly moneys: Money[] = []

  private addMoneyReducer (bank: Bank, currency: Currency): (previousValue: Money, currentValue: Money, currentIndex: number, array: Money[]) => Money {
    return (sum: Money, money: Money) => {
      return sum.add(bank.convertMoney(money, currency));
    }
  }

  evaluateMoney (currency: Currency, bank: Bank): Money {
    return this.moneys.reduce(this.addMoneyReducer(bank, currency), Money.create(0, Currency.EUR))
  }

  addMoney (money: Money): void {
    this.moneys.push(money)
  }
}
