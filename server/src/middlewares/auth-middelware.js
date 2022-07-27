const APIError = require("../exeptions/APIError.js");
const { user } = require("../mail/mail.config.js");
const tokenService = require("../token/token-service.js");

module.exports = async function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authtorization;
    if (!authorizationHeader) {
      return next(APIError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(APIError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(APIError.UnauthorizedError());
    }
    next();
  } catch (e) {
    return next(APIError.UnauthorizedError());
  }
};
