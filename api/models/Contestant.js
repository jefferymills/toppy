const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const War = require('./War');

const Contestant = sequelize.define('Contestants', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    warId: {
        type: Sequelize.INTEGER,
    },
});

//Contestant.belongsTo(War);

module.exports = Contestant;
