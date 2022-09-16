export class RequestError extends Error {
  constructor({
    message,
  }: {
    message: string
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message)

    this.name = 'RequestError'

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError)
    }
  }
}

export default RequestError
