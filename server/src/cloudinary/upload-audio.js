const multer = require("multer");

const storage = multer.memoryStorage();

const uploadAudio = multer({ storage });

module.exports = uploadAudio;
