const { DataTypes } = require("sequelize");
const dataBase = require("../db/index.js");

const DialogModel = dataBase.define("dialogs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  lastMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = DialogModel;
