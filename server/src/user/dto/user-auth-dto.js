module.exports = class UserAuthDto {
  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.username = model.username;
    this.isActivated = model.isActivated;
    this.avatar = model.avatar;
  }
};
