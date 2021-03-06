/**
 * Definition of the database for users
 */
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      experience: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
    });
  
    return User;
  };