const { Op } = require("sequelize");
const UserDialogModel = require("../consolidated-models/user-dialog-model");
const UserModel = require("../user/user-model");
const DialogModel = require("./dialog-model");
const ApiError = require("../exeptions/APIError");
const messageService = require("../message/message-service");
const UserDto = require("../user/dto/user-dto");
const DialogDto = require("./dto/dialog-dto");
const MessageModel = require("../message/message-model");
const socketService = require("../socket/socket-service");

class DialogService {
  async getUserDialogs(id) {
    const dialogsLinks = await UserDialogModel.findAll({
      where: { [Op.or]: [{ user1_id: id }, { user2_id: id }] },
    });

    if (!dialogsLinks.length) {
      return [];
    }
    const dialogs = await Promise.all(
      dialogsLinks.map(async (dialogLink) => {
        const dialog = await DialogModel.findByPk(dialogLink.dialog_id);
        const dialogDto = new DialogDto(dialog);
        const user_id =
          dialogLink.user1_id == id ? dialogLink.user2_id : dialogLink.user1_id;
        const user = await UserModel.findByPk(user_id);
        const userDto = new UserDto(user);
        const messages = await MessageModel.findAll({
          where: {
            dialogId: dialogLink.dialog_id,
            userId: user_id,
            isReaded: false,
          },
        });
        return {
          ...dialogDto,
          user: userDto,
          unreadedMessages: messages.length,
        };
      })
    );
    return dialogs;
  }
  async getDialogMessages(dialogId) {
    if (dialogId === "0") {
      return [];
    }
    const dialog = await DialogModel.findByPk(dialogId);
    if (!dialog) {
      throw ApiError.BadRequest("Запрашиваемого диалога не существует");
    }
    const dialogMessages = await messageService.getMessages(dialogId);
    return dialogMessages;
  }
  async createDialog(user1_id, user2_id, text) {
    if (!user1_id || !user2_id || !text) {
      throw ApiError.BadRequest(
        "Значения идентификаторов пользователей диалога и первый текст соообщения не должны быть пустыми"
      );
    }
    if (user1_id == user2_id) {
      throw ApiError.BadRequest(
        "Диалог не может быть создан с одним и тем же пользователем"
      );
    }
    const candidateDialog = await UserDialogModel.findOne({
      where: {
        [Op.or]: [
          { user1_id, user2_id },
          { user1_id: user2_id, user2_id: user1_id },
        ],
      },
    });
    if (candidateDialog) {
      throw ApiError.BadRequest("Такой диалог уже существует");
    }
    const newDialog = await DialogModel.create({ lastMessage: text });
    await UserDialogModel.create({
      user1_id,
      user2_id,
      dialog_id: newDialog.id,
    });
    await messageService.createMessage(newDialog.id, user1_id, text);
    const dialogDto = new DialogDto(newDialog);
    const user1 = await UserModel.findByPk(user1_id);
    const user1Dto = new UserDto(user1);
    const user2 = await UserModel.findByPk(user2_id);
    const user2Dto = new UserDto(user2);

    const usersSocketId = socketService.getUsersSocketIdArray(
      user1Dto.id,
      user2Dto.id
    );
    usersSocketId.forEach((socketId) => {
      io.to(socketId).emit("server:new_dialog", {
        dialog: dialogDto,
        user1: user1Dto,
        user2: user2Dto,
      });
    });

    return { ...dialogDto, user: { ...user2Dto } };
  }
  async deleteDialog(dialogId) {
    if (!dialogId) {
      throw ApiError.BadRequest("Отсутствует идентификатор диалога");
    }
    const usersDialog = await UserDialogModel.findOne({
      where: { dialog_id: dialogId },
    });
    const usersSocketId = socketService.getUsersSocketIdArray(
      usersDialog.user1_id,
      usersDialog.user2_id
    );
    usersSocketId.forEach((socketId) => {
      io.to(socketId).emit("server:delete_dialog", dialogId);
    });
    await usersDialog.destroy();
    await DialogModel.destroy({ where: { id: dialogId } });
    await MessageModel.destroy({ where: { dialogId } });
  }
}
module.exports = new DialogService();
