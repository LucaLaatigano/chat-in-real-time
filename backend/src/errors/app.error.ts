export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode: number = 400, name: string = "AppError") {
    super(message)
    this.statusCode = statusCode
    this.name = name
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor);
  }
}