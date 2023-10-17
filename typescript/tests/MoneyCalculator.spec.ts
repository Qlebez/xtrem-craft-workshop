import { Currency } from '../src/Currency'
import { MoneyCalculator } from '../src/MoneyCalculator'

class Money {
  private _amount: number;
  private _currency: Currency;
  
  constructor(amount: number, currency: Currency) {
    this._amount = amount;
    this._currency = currency;
  }
  
  add(money: Money) {
    return new Money(this._amount + money._amount, this._currency);
  }
}

describe('Money', function () {
  test('add in usd returns number', () => {
    const money_add = MoneyCalculator.Add(5, Currency.USD, 10)
    expect(money_add).toBeNumber()
  
    const money_add_2 = MoneyCalculator.Add(5, Currency.USD, 10)
    expect(money_add_2).not.toBeNull()
  })

  test('multiply in eur returns positive number', () => {
    const money_multiply = MoneyCalculator.Times(10, Currency.EUR, 2)

    expect(money_multiply).toBeGreaterThan(0)
  })

  test('divide in korean won returns number', () => {
    const money_divison = MoneyCalculator.Divide(4002, Currency.KRW, 4)
    expect(1000.5, ).toBe(money_divison)
  })

  test('test to see if operation work', () => {
    const money_add = MoneyCalculator.Add(5, Currency.EUR, 10)
    expect(money_add).toBe(15)

    const money_multiply = MoneyCalculator.Times(10, Currency.EUR, 2)
    expect(money_multiply).toBe(20)

    const money_divison = MoneyCalculator.Divide(400, Currency.KRW, 4)
    expect(money_divison).toBe(100)
  })

  test('should add money', () => {
    const money: Money = new Money(5, Currency.USD);
    const sum = money.add(new Money(10, Currency.USD));

    expect(sum).toEqual(new Money(15, Currency.USD));
  })
})
