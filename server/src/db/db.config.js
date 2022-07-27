require("dotenv").config();

module.exports = {
  dialect: process.env.DB_CONFIG_DIALECT,
  database: process.env.DB_CONFIG_DATABASE,
  username: process.env.DB_CONFIG_USERNAME,
  password: process.env.DB_CONFIG_PASSWORD,
  host: process.env.DB_CONFIG_HOST,
  port: Number(process.env.DB_CONFIG_PORT),
};
