
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('brands', {
            brand_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            brand_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('brands');
    }
};
