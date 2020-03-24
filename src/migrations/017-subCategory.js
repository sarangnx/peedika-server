
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('sub_category', {
            sub_category_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            parent_category_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'category',
                    key: 'category_id'
                }
            },
            sub_category_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            image: {
                type: Sequelize.STRING(100),
                allowNull: true,
                defaultValue: 'default.jpg'
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('sub_category');
    }
};
