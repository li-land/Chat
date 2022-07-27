const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("./index");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "chat-images",
    allowed_formats: ["jpg", "png", "gif", "jpeg"],
    transformation: { width: 180, height: 180, gravity: "faces", crop: "fill" },
  },
});

const uploadImages = multer({ storage });

module.exports = uploadImages;
