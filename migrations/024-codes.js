
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('codes', {
            entry_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull:false,
                references: {
                    model: 'users',
                    key: 'user_id'
                }
            },
            code: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            verified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('codes');
    }
};
