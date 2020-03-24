
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('inventory', {
            item_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            store_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'stores',
                    key: 'store_id'
                }
            },
            item_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            item_name_localization: {
                type: Sequelize.JSON,
                allowNull: true
            },
            attributes: {
                type: Sequelize.JSON,
                allowNull: true
            },
            brand_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'brands',
                    key: 'brand_id'
                }
            },
            quantity: {
                type: Sequelize.DECIMAL(8,3),
                allowNull: false,
                defaultValue: 1
            },
            unit: {
                type: Sequelize.ENUM,
                values: [
                    'g',
                    'kg',
                    'ml',
                    'l',
                    'count'
                ],
                allowNull: false,
                defaultValue: 'count'
            },
            market_price: {
                type: Sequelize.DECIMAL(8,2),
                allowNull: true
            },
            offer_price: {
                type: Sequelize.DECIMAL(8,2),
                allowNull: true
            },
            image_path: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            coupon_code: {
                type: Sequelize.STRING(10),
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
        }).then(() => {
            return queryInterface.addIndex('inventory',{
                type: 'FULLTEXT',
                fields: ['item_name']
            });
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('inventory')
    }
};
