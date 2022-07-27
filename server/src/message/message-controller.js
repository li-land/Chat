const messageService = require("./message-service");
const cloudinary = require("../cloudinary");

class MessageController {
  async createMessage(req, res, next) {
    try {
      const { dialogId, userId, text } = req.body;
      const files = req.files;
      await messageService.createMessage(dialogId, userId, text, files);
      return res.send();
    } catch (e) {
      next(e);
    }
  }
  async createVoiceMessage(req, res, next) {
    try {
      const { dialogId, userId } = req.body;
      const fileBuffer = req.file.buffer;
      await messageService.createVoiceMessage(dialogId, userId, fileBuffer);
      return res.send();
    } catch (e) {
      next(e);
    }
  }
  async setIsReadedMessages(req, res, next) {
    try {
      const { dialogId, userId } = req.body;
      await messageService.setIsReadedMessages(dialogId, userId);
      return res.send();
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new MessageController();
