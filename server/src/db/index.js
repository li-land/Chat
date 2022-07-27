const { Sequelize } = require("sequelize");
require("dotenv").config();
const config = require("./db.config.js");

if (!process.env.DATABASE_URL) {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      define: {
        timestamps: true,
      },
    }
  );
  module.exports = sequelize;
  return;
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: config.dialect,
  protocol: "postgres",
  define: {
    timestamps: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
