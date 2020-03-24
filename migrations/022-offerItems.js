
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('offer_items', {
            entry_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            offer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'offers',
                    key: 'offer_id'
                }
            },
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'inventory',
                    key: 'item_id'
                }
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('offer_items');
    }
};
