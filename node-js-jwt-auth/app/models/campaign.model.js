
module.exports = (sequelize, Sequelize) => {
    const Campaign = sequelize.define("campaigns", {
        
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        description: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        },
        active: {
            type: Sequelize.BOOLEAN
        },

    });

    return Campaign;
};