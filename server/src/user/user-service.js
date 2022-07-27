const { Op, where } = require("sequelize");
const UserModel = require("./user-model");
const UserDto = require("./dto/user-dto");
const UserAuthDto = require("./dto/user-auth-dto");
const tokenService = require("../token/token-service");
const DialogModel = require("../dialog/dialog-model");
const MessageModel = require("../message/message-model");
const ApiError = require("../exeptions/APIError");

class UserService {
  async getUserAuthData(userData) {
    const userAuthDto = new UserAuthDto(userData);
    const tokens = await tokenService.generateTokens({ ...userAuthDto });
    await tokenService.saveToken(userAuthDto.id, tokens.refreshToken);
    return { ...tokens };
  }
  async getOtherUsers(userId) {
    if (!userId) {
      throw ApiError.BadRequest("Отсутствует идентификатор пользователя");
    }
    const users = await UserModel.findAll({
      where: { id: { [Op.not]: userId } },
    });
    const usersDto = users.map((user) => {
      const userDto = new UserDto(user);
      return { ...userDto };
    });
    return usersDto;
  }
  async changeAvatar(userId, imagePath) {
    if (!userId) {
      throw ApiError.BadRequest("Отсутствует идентификатор пользователя");
    }
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw ApiError.BadRequest("Пользователя не существует");
    }
    user.avatar = imagePath;
    await user.save();
  }
  async deleteUser(userId) {
    if (!userId) {
      throw ApiError.BadRequest("Отсутствует идентификатор пользователя");
    }
    await UserModel.destroy({ where: { id: userId } });
    const dialogsLinks = await UserDialogModel.destroy({
      where: { [Op.or]: [{ user1_id: userId }, { user2_id: userId }] },
    });
    await Promise.all(
      dialogsLinks.foreach(async (dialogLink) => {
        await DialogModel.destroy({ where: { id: dialogLink.dialog_id } });
        await MessageModel.destroy({
          where: { dialogId: dialogLink.dialog_id },
        });
      })
    );
  }
}
module.exports = new UserService();
