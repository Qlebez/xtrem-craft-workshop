export class DivisionByZeroError extends Error {
    constructor () {
      super("Can't divide by zero")
    }
  
    message: string
  }
  