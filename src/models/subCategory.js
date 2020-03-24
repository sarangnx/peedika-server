/**
 * model: sub-category
 * Stores the list of sub categories, and associates with
 * inventory and categories.
 */

module.exports = (sequelize, DataTypes) => {
    const sub_category = sequelize.define('sub_category', {
        sub_category_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        parent_category_id: {
            // ID of the main category.
            // references to category model.
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sub_category_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: 'default.jpg'
        }
    }, { timestamps: false, freezeTableName: true });
    
    sub_category.associate = function(models) {
        sub_category.belongsTo(models.category, {
            foreignKey: 'parent_category_id',
            targetKey: 'category_id',
            as: 'parent_category'
        });

        sub_category.hasMany(models.sub_sub_category, {
            foreignKey: 'sub_category_id',
            sourceKey: 'sub_category_id',
            as: 'sub_sub_category'
        });

        sub_category.belongsToMany(models.inventory, {
            through: models.sub_category_items,
            // field of junction table
            foreignKey: 'sub_category_id',
            timestamps: false,
            as: 'items'
        });
    };
    return sub_category;
};
