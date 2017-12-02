const Sequelize = require('sequelize');
const sequelize = new Sequelize('toppy', 'toppy_user', 'toppy123', {
    host: 'mysql',
    port: 3306,
    dialect: 'mysql',
});

module.exports = sequelize;
