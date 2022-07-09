const { Sequelize, DataTypes } = require('sequelize');

const dotenv = require('dotenv');

dotenv.config({path: './config.env'})

const database = new Sequelize({
    dialect: 'postgres',
    database: process.env.DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
});

module.exports = { database, DataTypes };