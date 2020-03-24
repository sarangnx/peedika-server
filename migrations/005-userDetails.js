
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_details', {
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id'
                }
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            address: {
                type: Sequelize.JSON,
                allowNull: true
            },
            verification_code: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user_details');
    }
};
