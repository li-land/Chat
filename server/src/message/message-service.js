const DialogModel = require("../dialog/dialog-model");
const UserModel = require("../user/user-model");
const UserDialogModel = require("../consolidated-models/user-dialog-model");
const MessageModel = require("./message-model");
const MessageDto = require("./dto/message-dto");
const UserDto = require("../user/dto/user-dto");
const ApiError = require("../exeptions/APIError");
const socketService = require("../socket/socket-service");
const cloudinary = require("../cloudinary");
const { image } = require("../cloudinary");

class MessageService {
  async getMessages(dialogId) {
    const messages = await MessageModel.findAll({
      where: { dialogId },
      order: [["updatedAt", "ASC"]],
    });

    const messagesDto = await Promise.all(
      messages.map(async (message) => {
        const messageDto = new MessageDto(message);
        const user = await UserModel.findByPk(message.userId);
        const userDto = new UserDto(user);
        return { ...messageDto, user: userDto };
      })
    );
    return messagesDto;
  }
  async getLastMessage(dialogId) {
    const messages = await MessageModel.findAll({
      where: { dialogId },
      order: [["updatedAt", "DESC"]],
    });
    const lastMessage = messages[0];
    return lastMessage;
  }
  async createMessage(dialogId, userId, text, files) {
    if (!dialogId || !userId) {
      throw ApiError.BadRequest(
        "Нет идентификаторов диалога и/или пользователя"
      );
    }

    const dialog = await DialogModel.findByPk(dialogId);
    if (!dialog) {
      throw ApiError.BadRequest("Такого диалога не существует");
    }

    let imagesURL = [];
    if (files) {
      imagesURL = files.map((file) => {
        return file.path;
      });
    }

    const message = await MessageModel.create({
      dialogId,
      userId,
      text,
      imagesURL,
    });

    const user = await UserModel.findByPk(userId);
    const userDto = new UserDto(user);

    if (!text) {
      dialog.lastMessage = "Фото...";
    } else {
      dialog.lastMessage = message.text;
    }

    dialog.updatedAt = message.updatedAt;
    await dialog.save();

    const messageDto = new MessageDto(message);

    const usersDialog = await UserDialogModel.findOne({
      where: { dialog_id: dialogId },
    });

    const usersSocketId = socketService.getUsersSocketIdArray(
      usersDialog.user1_id,
      usersDialog.user2_id
    );
    usersSocketId.forEach((socketId) => {
      io.to(socketId).emit("server:new_message", {
        ...messageDto,
        user: userDto,
      });
    });

    const messages = await MessageModel.findAll({
      where: { dialogId, userId, isReaded: false },
    });

    const receiverUserId =
      usersDialog.user1_id == userId
        ? usersDialog.user2_id
        : usersDialog.user1_id;

    const receiverUserSocketId = userId_socketId
      .filter((item) => item.userId == receiverUserId)
      .map((item) => {
        return item.socketId;
      });

    receiverUserSocketId.forEach((socketId) => {
      io.to(socketId).emit("server:unreaded_messages", {
        dialogId,
        lastMessage: message.text,
        unreadedMessagesLength: messages.length,
      });
    });
  }
  async createVoiceMessage(dialogId, userId, fileBuffer) {
    if (!dialogId || !userId) {
      throw ApiError.BadRequest(
        "Нет идентификаторов диалога и/или пользователя"
      );
    }
    const dialog = await DialogModel.findByPk(dialogId);
    if (!dialog) {
      throw ApiError.BadRequest("Такого диалога не существует");
    }
    const user = await UserModel.findByPk(userId);
    const userDto = new UserDto(user);

    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, async (error, result) => {
        if (error) {
          throw ApiError.BadRequest("Ошибка с cloudinary " + error);
        }
        const message = await MessageModel.create({
          dialogId,
          userId,
          text: "",
          audioURL: result.url,
        });
        dialog.lastMessage = "Голосовое сообщение...";
        dialog.updatedAt = message.updatedAt;
        await dialog.save();

        const messageDto = new MessageDto(message);
        const usersDialog = await UserDialogModel.findOne({
          where: { dialog_id: dialogId },
        });

        const usersSocketId = socketService.getUsersSocketIdArray(
          usersDialog.user1_id,
          usersDialog.user2_id
        );

        usersSocketId.forEach((socketId) => {
          io.to(socketId).emit("server:new_message", {
            ...messageDto,
            user: userDto,
          });
        });
      })
      .end(fileBuffer);
  }
  async setIsReadedMessages(dialogId, userId) {
    if (!dialogId || !userId) {
      throw ApiError.BadRequest(
        "Нет идентификаторов диалога и/или пользователя"
      );
    }
    const usersDialog = await UserDialogModel.findOne({
      where: { dialog_id: dialogId },
    });

    const user_id =
      usersDialog.user1_id == userId
        ? usersDialog.user2_id
        : usersDialog.user1_id;

    const messages = await MessageModel.findAll({
      where: { dialogId, userId: user_id, isReaded: false },
    });

    if (messages) {
      messages.forEach(async (message) => {
        message.isReaded = true;
        await message.save();
      });
    }
  }
}
module.exports = new MessageService();
