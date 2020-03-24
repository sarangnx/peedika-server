/**
 * model: category
 * Stores the list of categories, and associates with
 * inventory.
 */

module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define('category', {
        category_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        category_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: 'default.jpg'
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        // Full Text Search Index
        indexes: [{
            type: 'FULLTEXT',
            fields: ['category_name']
        }]
    });
    
    category.associate = function(models) {
        category.belongsToMany(models.inventory, {
            through: models.category_items,
            // field of junction table
            foreignKey: 'category_id',
            timestamps: false,
            as: 'items'
        });

        category.hasMany(models.sub_category, {
            foreignKey: 'parent_category_id',
            sourcekey: 'category_id',
            as: 'sub_category'
        });
    };
    return category;
};
