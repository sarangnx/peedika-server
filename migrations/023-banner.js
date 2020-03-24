
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('banners', {
            banner_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            banner_order: {
                allowNull:false,
                type: Sequelize.INTEGER,
                unique: true
            },
            banner_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            banner_image: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            offer_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('banners');
    }
};
