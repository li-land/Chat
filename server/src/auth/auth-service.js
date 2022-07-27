require("dotenv").config();
const UserModel = require("../user/user-model.js");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserAuthDto = require("../user/dto/user-auth-dto");
const mailService = require("../mail/mail-service");
const tokenService = require("../token/token-service");
const APIError = require("../exeptions/APIError.js");
const userService = require("../user/user-service.js");

class AuthService {
  async registration(username, email, password) {
    const candidate = await UserModel.findOne({ where: { email } });
    if (candidate) {
      throw APIError.BadRequest("Пользователь с таким email уже существует");
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationLink(
      email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`
    );
    const userData = await userService.getUserAuthData(user);
    return userData;
  }
  async login(email, password) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      throw APIError.BadRequest("Пользователя с таким email не существует");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw APIError.BadRequest("Пароль введен не верно");
    }
    const userData = await userService.getUserAuthData(user);
    return userData;
  }
  async activate(activationLink) {
    const user = await UserModel.findOne({ where: { activationLink } });
    if (!user) {
      throw APIError.BadRequest("Некоректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }
  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw APIError.UnauthorizedError();
    }
    const currentUserData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!currentUserData || !tokenFromDb) {
      throw APIError.UnauthorizedError();
    }
    const user = await UserModel.findByPk(currentUserData.id);
    const userData = await userService.getUserAuthData(user);
    return userData;
  }
}

module.exports = new AuthService();
