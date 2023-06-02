export default class BaseError extends Error {
  constructor({ message }: { message: string }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError);
    }
  }
}
