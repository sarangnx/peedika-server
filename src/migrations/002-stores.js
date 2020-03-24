
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('stores', {
            store_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement : true,
                allowNull: false
            },
            address: {
                type: Sequelize.JSON,
                allowNull: true
            },
            name: {
                type: Sequelize.STRING(225),
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING(15),
                allowNull: true
            },
            gst: {
                type: Sequelize.STRING(20),
                allowNull: true
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            rating: {
                type: Sequelize.REAL(2,1),
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
