
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
            image: {
                type: Sequelize.STRING(100),
                allowNull: true,
                defaultValue: 'default.jpg'
            }
        }).then(() => {
            return queryInterface.addIndex('category',{
                type: 'FULLTEXT',
                fields: ['category_name']
            });
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('category');
    }
};
