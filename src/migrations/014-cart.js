
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cart', {
            cart_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            added_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('cart')
    }
};
