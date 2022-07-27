const { Router } = require("express");
const authRouter = require("./auth/auth-router");
const userRouter = require("./user/user-router");
const dialogRouter = require("./dialog/dialog-router");
const messageRouter = require("./message/message-router");

const apiRouter = new Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/dialog", dialogRouter);
apiRouter.use("/message", messageRouter);

module.exports = apiRouter;
