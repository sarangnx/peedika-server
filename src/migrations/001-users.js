
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            email: {
                type: Sequelize.STRING(100),
                unique: true,
                allowNull: true
            },
            phone: {
                type: Sequelize.STRING(20),
                unique: true,
                allowNull: true
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            /**
             * Possible values:
             *  - users [group: users]
             *  - owner [group: store]
             *  - salesman [group: store]
             */
            roles: {
                type: Sequelize.JSON,
                allowNull: true
            },
            /**
             * Possible values:
             *  - users
             *  - store
             */
            usergroup: {
                type: Sequelize.STRING(20),
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
        return queryInterface.dropTable('users');
    }
};
