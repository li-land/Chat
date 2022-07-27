const { DataTypes } = require("sequelize");
const dataBase = require("../db/index.js");
const UserModel = require("../user/user-model.js");
const DialogModel = require("../dialog/dialog-model.js");

const UserDialogModel = dataBase.define(
  "users_dialogs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    user2_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    dialog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DialogModel,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
module.exports = UserDialogModel;
