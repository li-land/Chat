const userService = require("./user-service");

class UserController {
  async getOtherUsers(req, res, next) {
    try {
      const { id } = req.params;
      const users = await userService.getOtherUsers(id);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  async changeAvatar(req, res, next) {
    try {
      const { id } = req.params;
      const { path } = req.file;
      await userService.changeAvatar(id, path);
      return res.send();
    } catch (e) {
      next(e);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      return res.send();
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new UserController();
