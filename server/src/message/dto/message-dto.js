module.exports = class MessageDto {
  constructor(model) {
    this.id = model.id;
    this.dialogId = model.dialogId;
    this.text = model.text;
    this.imagesURL = model.imagesURL;
    this.audioURL = model.audioURL;
    this.updatedAt = model.updatedAt;
    this.userId = model.userId;
  }
};
