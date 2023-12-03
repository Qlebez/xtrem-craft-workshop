export class NegativeAmountError extends Error {
  constructor (amount: number) {
    super(`Amount ${amount} is negative`)
  }

  message: string
}
