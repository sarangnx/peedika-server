
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('order_details', {
            entry_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            order_id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'orders',
                    key: 'order_id'
                }
            },
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            unit_price: {
                type: Sequelize.DECIMAL(8,2),
                allowNull: false
            },
            quantity: {
                // Quantity specified by the user.
                type: Sequelize.DECIMAL(8,3),
                allowNull: false
            },
            unit: {
                // Unit of the quantity specified by the user.
                type: Sequelize.ENUM,
                values: [
                    'g',
                    'kg',
                    'ml',
                    'l',
                    'count'
                ]
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('order_details')
    }
};
