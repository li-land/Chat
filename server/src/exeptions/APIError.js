module.exports = class APIError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static BadRequest(message, errors = []) {
    return new APIError(400, message, errors);
  }
  static UnauthorizedError() {
    return new APIError(401, "Пользователь не авторизован");
  }
  static NotFound() {
    return new APIError(404, "Запрашиваемая информация не найдена");
  }
};
