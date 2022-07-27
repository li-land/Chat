const cloudinary = require("cloudinary").v2;
const config = require("./cloudinary.config");

cloudinary.config(config);

module.exports = cloudinary;
