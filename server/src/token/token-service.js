require("dotenv").config();
const jwt = require("jsonwebtoken");
const TokenModel = require("./token-model.js");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "20m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  validateAccessToken(token) {
     try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ where: { userId: userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
      return;
    }
    await TokenModel.create({
      userId,
      refreshToken,
    });
  }
  async removeToken(refreshToken) {
    const token = await TokenModel.destroy({
      where: { refreshToken },
    });
    return token;
  }
  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({
      where: { refreshToken },
    });
    return tokenData;
  }
}

module.exports = new TokenService();
