import { Currency } from "../src/Currency";
import { Bank } from "../src/Bank";

export class Portfolio {
       
    private readonly _amounts: Map<Currency, number> = new Map()

    evaluate(currency: Currency, bank: Bank): number {
        if (this._amounts.size === 0) { return 0; }

        let total: number = 0;

        this._amounts.forEach((currency_iter, number) => {
        
            total += bank.convert(currency_iter, number, currency);
        })

        return total;
    }

    addAmount(amount: number, currency: Currency) {
        if (this._amounts.has(currency)) {
            amount += this._amounts.get(currency);
        }
        
        this._amounts.set(currency, amount)
    }
}