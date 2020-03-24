
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('orders', {
            order_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            order_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            delivery_address: {
                type: Sequelize.JSON,
                allowNull: false
            },
            invoice_number: {
                type: Sequelize.STRING(60),
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            store_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            delivery_method: {
                type: Sequelize.ENUM,
                values: [
                    'PICKUP',
                    'HOMEDELIVERY'
                ],
                defaultValue: 'HOMEDELIVERY'
            },
            payment_method: {
                type: Sequelize.ENUM,
                values: ['COD', 'GPAY', 'PHONEPE'],
                defaultValue: 'COD'
            },
            order_status: {
                type: Sequelize.ENUM,
                values: [
                    'PENDING',
                    'PROCESSING',
                    'READY',
                    'OUTFORDELIVERY',
                    'DELIVERED',
                    'CANCELLED'
                ],
                defaultValue: 'PENDING'
            },
            deliver_by: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
                allowNull: true
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
        return queryInterface.dropTable('orders')
    }
};
