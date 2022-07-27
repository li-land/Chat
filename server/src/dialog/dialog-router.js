const { Router } = require("express");
const dialogController = require("./dialog-controller.js");
const authMiddelware = require("../middlewares/auth-middelware");

const dialogRouter = new Router();

dialogRouter.get("/all/:id", authMiddelware, dialogController.getUserDialogs);
dialogRouter.get("/:id", authMiddelware, dialogController.getDialogMessages);
dialogRouter.post("/create", authMiddelware, dialogController.createDialog);
dialogRouter.get("/delete/:id", authMiddelware, dialogController.deleteDialog);

module.exports = dialogRouter;
