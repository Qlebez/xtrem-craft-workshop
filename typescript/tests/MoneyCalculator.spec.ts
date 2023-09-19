import { Currency } from '../src/Currency'
import { MoneyCalculator } from '../src/MoneyCalculator'

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
})
