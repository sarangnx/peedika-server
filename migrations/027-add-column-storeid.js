
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('localbodies', 'store_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'stores',
                key: 'store_id'
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('localbodies', 'store_id');
    }
};
