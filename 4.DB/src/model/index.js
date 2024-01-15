const Sequelize = require('sequelize');
const config = require('../config/config');

const db = {};

const sequelize = new Sequelize({...config, sync: false});

db.sequelize = sequelize;

db.write = require('./write')(sequelize, Sequelize);

module.exports = db;