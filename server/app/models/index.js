/**
 * This file handles the database and the relationships between the different tables
 */
const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
// Connection to database
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

//Relationship between Users and Roles
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "farmer", "helper"];

db.campaign = require("../models/campaign.model.js")(sequelize, Sequelize);
//Relationship between Users and Campaigns
db.campaign.belongsToMany(db.user, {
  through: "complete_campaign",
  as: "users",
  foreignKey: "campaignId",
});

db.user.belongsToMany(db.campaign,{
  through: "complete_campaign",
  as: "campaigns",
  foreignKey: "userId",
});

module.exports = db;