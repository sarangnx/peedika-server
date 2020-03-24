
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('sub_category_items', {
            entry_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'inventory',
                    key: 'item_id'
                }
            },
            sub_category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'sub_category',
                    key: 'sub_category_id'
                }
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('sub_category_items');
    }
};
