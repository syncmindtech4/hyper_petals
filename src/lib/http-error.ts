// Error subclass carrying a `statusCode` — the root error middleware
// (src/start.ts) rethrows anything with a `statusCode` instead of collapsing
// it into a generic 500 page, so this is how server functions signal a real
// HTTP status (401/403/404/...) rather than an unexpected crash.
export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}
