
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('stores', {
            store_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement : true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(225),
                allowNull: false,
            },
            area: {
                // area or locality
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            city: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            district: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            pincode: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            ward: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            phone: {
                type: Sequelize.STRING(15),
                allowNull: true
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            opening_time: {
                type: Sequelize.TIME,
                allowNull: false
            },
            closing_time: {
                type: Sequelize.TIME,
                allowNull: false
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
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
        return queryInterface.dropTable('stores');
    }
};
