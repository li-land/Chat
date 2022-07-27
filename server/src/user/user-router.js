const { Router } = require("express");
const authMiddelware = require("../middlewares/auth-middelware");
const userController = require("./user-controller");
const uploadImages = require("../cloudinary/upload-images");

const userRouter = new Router();

userRouter.get("/all/:id", authMiddelware, userController.getOtherUsers);

userRouter.post(
  "/change-avatar/:id",
  authMiddelware,
  uploadImages.single("avatar-image"),
  userController.changeAvatar
);
userRouter.delete("/delete/:id", authMiddelware, userController.deleteUser);

module.exports = userRouter;
