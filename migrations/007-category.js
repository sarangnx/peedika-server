
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('category', {
            category_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            category_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            parent_category_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'category',
                    key: 'category_id'
                }
            },
            image: {
                type: Sequelize.STRING(100),
                allowNull: true,
                defaultValue: 'default.jpg'
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('category');
    }
};
