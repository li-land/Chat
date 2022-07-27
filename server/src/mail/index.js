const nodemailer = require("nodemailer");
const mailConfig = require("./mail.config.js");

const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  secure: false,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass,
  },
});

module.exports = transporter;
