
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ration', {
            entry_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'user_id'
                }
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            card_no: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            aadhar_no: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            phone: {
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            quantity: {
                type: Sequelize.DECIMAL(8,3),
                allowNull: true,
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
                allowNull: true,
                defaultValue: 'kg'
            },
            color: {
                type: Sequelize.STRING(20),
                allowNull: true,
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
        return queryInterface.dropTable('ration');
    }
};
