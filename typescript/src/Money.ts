import { Currency } from './Currency';
import { DivisionByZeroError } from './DivisionByZeroError';
import { NegativeAmountError } from './NegativeAmountError';
import { DifferentCurrenciesError } from './DifferentCurrenciesError';

export class Money {
    _amount: number;
    _currency: Currency;
    
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

    hasCurrency(currency2: Currency) {
      return this._currency === currency2;
    }

    convert(exchangeRate: number, currency2: Currency): Money {
      return Money.create(this._amount * exchangeRate, currency2);
    }
  }