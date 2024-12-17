const Redis = require("ioredis");
const { Sequelize } = require("sequelize");

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS);

// MYSQL configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

//Redis configuration
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

module.exports = { sequelize, redisClient };
