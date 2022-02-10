const Sequelize = require('sequelize');

const connection = new Sequelize('Question','root',null,{
    host: 'localhost',
    dialect: 'mysql',
    port:3306
});

module.exports = connection;
