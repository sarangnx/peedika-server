
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cart_details', {
            entry_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cart_id: {
                // foreign_key to carts table
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'cart',
                    key: 'cart_id'
                }
            },
            item_id: {
                type: Sequelize.INTEGER,
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
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('cart_details')
    }
};
