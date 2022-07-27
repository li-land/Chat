const { DataTypes } = require("sequelize");
const dataBase = require("../db/index.js");
const UserModel = require("../user/user-model.js");
const DialogModel = require("../dialog/dialog-model.js");

const MessageModel = dataBase.define("messages", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagesURL: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  audioURL: {
    type: DataTypes.STRING,
  },
  isReaded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

MessageModel.belongsTo(DialogModel, { onDelete: "cascade" });
MessageModel.belongsTo(UserModel);

module.exports = MessageModel;
