const transporter = require(".");

class MailService {
  async sendActivationLink(email, link) {
    try {
      await transporter.sendMail({
        from: "ChatRoom",
        to: email,
        subject: "Активация аккаунта",
        html: `Для активации аккаунта пожалуйста перейдите по этой <a href="${link}">ссылке</a>`,
      });
    } catch (e) {
      throw ApiError.BadRequest(
        "Ошибка при отправке сообщения на email. Проверьте корректность введенной почты"
      );
    }
  }
}

module.exports = new MailService();
