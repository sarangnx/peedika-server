
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('offers', {
            offer_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            offer_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            offer_description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            offer_status: {
                // Set offer active state to true or false
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            discount_percentage: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('offers');
    }
};
