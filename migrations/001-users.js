
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
            name: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            house: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            ward: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            area: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            landmark: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            district: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            pincode: {
                type: Sequelize.STRING(10),
                allowNull: true
            },
            verified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            roles: {
                type: Sequelize.JSON,
                allowNull: true
            },
            usergroup: {
                type: Sequelize.ENUM,
                allowNull: true,
                values: [
                    'superadmin',
                    'admin',
                    'user',
                    'storeowner',
                    'delivery',
                ]
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
