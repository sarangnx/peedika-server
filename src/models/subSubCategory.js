/**
 * model: sub sub category
 */

module.exports = (sequelize, DataTypes) => {
    const sub_sub_category = sequelize.define('sub_sub_category', {
        sub_sub_category_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        sub_category_id: {
            // ID of the sub category.
            // references to sub_category model.
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sub_sub_category_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: 'default.jpg'
        }
    }, { timestamps: false, freezeTableName: true });
    
    sub_sub_category.associate = function(models) {
        sub_sub_category.belongsTo(models.sub_category, {
            foreignKey: 'sub_category_id',
            targetKey: 'sub_category_id',
            as: 'sub_category'
        });

        sub_sub_category.belongsToMany(models.inventory, {
            through: models.sub_sub_category_items,
            // field of junction table
            foreignKey: 'sub_sub_category_id',
            timestamps: false,
            as: 'items'
        });
    };
    return sub_sub_category;
};
