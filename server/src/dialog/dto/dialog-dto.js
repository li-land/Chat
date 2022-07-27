module.exports = class DialogDto {
  constructor(model) {
    this.id = model.id;
    this.lastMessage = model.lastMessage;
    this.updatedAt = model.updatedAt;
  }
};
