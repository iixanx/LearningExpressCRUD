const Sequelize = require('sequelize');
const config = require('../config/config');

const db = {};

const sequelize = new Sequelize({...config, sync: false});

db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Email = require('./email')(sequelize, Sequelize);

db.User.hasOne(db.Email, {foreignKey: 'userId', sourceKey: 'userId'})
db.Email.belongsTo(db.User, {foreignKey: 'userId', targetKey: 'userId', onDelete: 'CASCADE'})

module.exports = db;