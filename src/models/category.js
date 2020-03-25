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
        parent_category_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: 'default.jpg'
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
    
    category.associate = function(models) {
        // self association
        category.hasMany(models.category, {
            foreignKey: 'parent_category_id',
            sourcekey: 'category_id',
            as: 'sub_category'
        });
    };
    return category;
};
