const { DataTypes } = require("sequelize");
const dataBase = require("../db/index.js");
const UserModel = require("../user/user-model.js");

const TokenModel = dataBase.define("tokens", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

TokenModel.belongsTo(UserModel);

module.exports = TokenModel;
