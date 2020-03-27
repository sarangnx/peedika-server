
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('localbodies', {
            panchayath_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement : true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(225),
                allowNull: false,
            },
            code: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            district: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING(100), // kerala by default
                allowNull: true,
                defaultValue: 'kerala',
            },
            total_wards: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            available_wards: {
                // array of available wards
                type: Sequelize.JSON,
                allowNull: true,
            },
            type: {
                type: Sequelize.ENUM,
                values: [
                    'panchayath',
                    'municipality'
                ],
                defaultValue: 'panchayath',
                allowNull: false,
            },
            phone: {
                // general operations phone number
                type: Sequelize.STRING(15),
                allowNull: true
            },
            emergency_phone: {
                // emergency number
                type: Sequelize.STRING(15),
                allowNull: true
            },
            kitchen_phone: {
                // community kitchen number 
                type: Sequelize.STRING(15),
                allowNull: true
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
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
        return queryInterface.dropTable('localbodies');
    }
};
