export class AuthRequiredError extends Error {
  constructor(message = "You have to be authenticated to access this page") {
    super(message);
    this.name = "Requires Auth";
  }
}
