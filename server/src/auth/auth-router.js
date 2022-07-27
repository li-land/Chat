const { Router } = require("express");
const authController = require("./auth-controller");
const { body } = require("express-validator");

const authRouter = new Router();

authRouter.post("/login", body("email").isEmail(), authController.login);
authRouter.get("/logout", authController.logout);
authRouter.post(
  "/registration",
  body("email").isEmail(),
  authController.registration
);
authRouter.get("/activate/:activationLink", authController.activate);
authRouter.get("/refresh", authController.refresh);

module.exports = authRouter;
