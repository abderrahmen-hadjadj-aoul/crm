const { Sequelize, DataTypes } = require('sequelize');

const db = {};

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

db.connection = sequelize;

// SCHEMAS

// User
const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

async function setup() {
  await sequelize.sync({ force: false });
}

db.setup = setup;
db.User = User;

// EXPORT

module.exports = db;
