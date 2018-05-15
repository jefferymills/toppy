const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const Battle = require('./Battle');
const War = require('./War');

const User = sequelize.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
  },
});

//User.hasMany(Battle);
//User.hasMany(War);

module.exports = User;
