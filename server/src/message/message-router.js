const { Router } = require("express");
const messageController = require("./message-controller.js");
const uploadAudio = require("../cloudinary/upload-audio.js");
const uploadImages = require("../cloudinary/upload-images.js");
const authMiddelware = require("../middlewares/auth-middelware");

const messageRouter = new Router();

messageRouter.post(
  "/create",
  authMiddelware,
  uploadImages.array("images"),
  messageController.createMessage
);

messageRouter.post(
  "/create-voice",
  authMiddelware,
  uploadAudio.single("voice"),
  messageController.createVoiceMessage
);
messageRouter.post(
  "/set-readed",
  authMiddelware,
  messageController.setIsReadedMessages
);

module.exports = messageRouter;
