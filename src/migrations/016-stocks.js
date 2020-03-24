
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('stocks', {
            stock_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement : true,
                allowNull: false
            },
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            quantity: {
                type: Sequelize.DECIMAL(8,3),
                allowNull: false,
            },
            unit: {
                type: Sequelize.ENUM,
                values: [
                    'g',
                    'kg',
                    'ml',
                    'l',
                    'count'
                ]
            },
            cost: {
                type: Sequelize.DECIMAL(8, 2),
                allowNull: false
            },
            remaining_quantity: {
                type: Sequelize.DECIMAL(8,3),
                allowNull: false,
            },
            remaining_unit: {
                type: Sequelize.ENUM,
                values: [
                    'g',
                    'kg',
                    'ml',
                    'l',
                    'count'
                ]
            },
            arrival_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW'),
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
        return queryInterface.dropTable('stocks')
    }
};
