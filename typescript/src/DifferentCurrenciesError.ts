export class DifferentCurrenciesError extends Error {
    constructor (currency1: string, currency2: string) {
      super(currency1 + ' and ' + currency2 + ' are different currencies')
    }
  
    message: string
  }
  