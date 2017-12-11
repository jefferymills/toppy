const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const War = require('./War');
const User = require('./User');

const Battle = sequelize.define('Battles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
    },
    winnerId: {
        type: Sequelize.INTEGER,
    },
    loserId: {
        type: Sequelize.INTEGER,
    },
    warId: {
        type: Sequelize.INTEGER,
    },
    contestantA: {
        type: Sequelize.INTEGER,
    },
    contestantB: {
        type: Sequelize.INTEGER,
    },
});

Battle.belongsTo(War);
Battle.belongsTo(User);

module.exports = Battle;
