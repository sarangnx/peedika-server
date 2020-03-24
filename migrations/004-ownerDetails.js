
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('owner_details', {
            owner_id: {
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
            aadhaar_no: {
                type: Sequelize.STRING(20),
                allowNull: true
            },
            verification_code: {
                type: Sequelize.STRING(255),
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
        return queryInterface.dropTable('owner_details');
    }
};
