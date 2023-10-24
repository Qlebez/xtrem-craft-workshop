import { Currency } from '../src/Currency'
import { MoneyCalculator } from '../src/MoneyCalculator'
import { DivisionByZeroError } from '../src/DivisionByZeroError';
import { NegativeAmountError } from '../src/NegativeAmountError';
import { DifferentCurrenciesError } from '../src/DifferentCurrenciesError';

class Money {
  private _amount: number;
  private _currency: Currency;
  
  private constructor(amount: number, currency: Currency) {
    this._amount = amount;
    this._currency = currency;
  }

  static create(amount: number, currency: Currency) {
    if (amount < 0) {
      throw new NegativeAmountError(amount);
    }

    return new Money(amount, currency);
  }
  
  add(money: Money) {
    if (this._currency !== money._currency) {
      throw new DifferentCurrenciesError(this._currency, money._currency);
    }
    
    return Money.create(this._amount + money._amount, this._currency);
  }

  multiply(multiplier: number) {
    return Money.create(this._amount * multiplier, this._currency);
  }

  divide(divisor: number) {
    if (divisor === 0) {
      { throw new DivisionByZeroError() }
    }

    return Money.create(this._amount / divisor, this._currency);
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

// ------------------------------------ Money ------------------------------------

  test('should add money when currency are the same', () => {
    const money: Money = Money.create(5, Currency.USD);
    const sum = money.add(Money.create(10, Currency.USD));

    expect(sum).toEqual(Money.create(15, Currency.USD));
  })

  test('should not add money when currency are different', () => {
    const money: Money = Money.create(5, Currency.USD);
    const sum = () =>  money.add(Money.create(10, Currency.EUR));

    expect(sum).toThrow(DifferentCurrenciesError);
  })

  test('should multiply money', () => {
    const money: Money = Money.create(5, Currency.EUR);
    const sum = money.multiply(10);

    expect(sum).toEqual(Money.create(50, Currency.EUR));
  })

  test('should not multiply by negative number if the amount is negative', () => {
    const money: Money = Money.create(5, Currency.EUR);
    const sum = () => money.multiply(-10);

    expect(sum).toThrow(NegativeAmountError);
  })

  test('should divide money', () => {
    const money: Money = Money.create(1000, Currency.EUR);
    const sum = money.divide(4);

    expect(sum).toEqual(Money.create(250, Currency.EUR));
  })

  test('should not divide money by 0', () => {
    const money: Money = Money.create(1000, Currency.EUR);
    const sum = () => money.divide(0);

    expect(sum).toThrow(DivisionByZeroError);
  })

  test('should not divide money by negative divisor if the amount is negative', () => {
    const money: Money = Money.create(10, Currency.EUR);
    const sum = () => money.divide(-10);

    expect(sum).toThrow(NegativeAmountError);
  })

  test('test create money', () => {
    const money: Money = Money.create(10, Currency.EUR);
    expect(money).not.toBeNull()
  })
})