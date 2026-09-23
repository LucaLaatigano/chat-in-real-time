export class ApiError extends Error {
  private readonly status: number
  private readonly errorType: string

  constructor(message: string, status: number, errorType: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.errorType = errorType
  }
}