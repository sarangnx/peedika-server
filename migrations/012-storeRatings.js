
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('store_ratings', {
            rating_id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            store_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            star_rating: {
                type: Sequelize.REAL(2,1),
                allowNull: false
            },
            feedback: {
                type: Sequelize.TEXT,
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
        return queryInterface.dropTable('store_ratings');
    }
};
