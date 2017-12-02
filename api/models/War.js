const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
const Battle = require('./Battle');

const War = sequelize.define('Wars', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.INTEGER,
    },
});

//War.belongsTo(User);
//War.hasMany(Battle);

module.exports = War;
