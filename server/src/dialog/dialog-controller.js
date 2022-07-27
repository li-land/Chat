const dialogService = require("./dialog-service");

class DialogController {
  async getUserDialogs(req, res, next) {
    try {
      const { id } = req.params;
      const dialogs = await dialogService.getUserDialogs(id);
      return res.json(dialogs);
    } catch (e) {
      next(e);
    }
  }
  async getDialogMessages(req, res, next) {
    try {
      const { id } = req.params;
      const dialogMessages = await dialogService.getDialogMessages(id);
      return res.json(dialogMessages);
    } catch (e) {
      next(e);
    }
  }
  async createDialog(req, res, next) {
    try {
      const { user1_id, user2_id, text } = req.body; // user1_id  - пользователь, который создает диалог
      const newDialogData = await dialogService.createDialog(
        user1_id,
        user2_id,
        text
      );
      return res.status(200).json(newDialogData);
    } catch (e) {
      next(e);
    }
  }
  async deleteDialog(req, res, next) {
    try {
      const { id } = req.params;
      await dialogService.deleteDialog(id);
      return res.send();
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new DialogController();
