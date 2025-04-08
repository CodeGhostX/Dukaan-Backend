const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('e_comm', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: process.env.DB_PORT
});

module.exports = sequelize;