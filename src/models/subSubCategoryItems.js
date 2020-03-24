/**
 * Junction Table Connecting Sub Sub categories and items.
 */

module.exports = (sequelize, DataTypes) => {
    const subSubCategoryItems = sequelize.define('sub_sub_category_items', {
        entry_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        item_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        sub_sub_category_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }, { timestamps: false, freezeTableName: true });

    subSubCategoryItems.associate = function(models) {

        subSubCategoryItems.belongsTo(models.inventory, {
            foreignKey: 'item_id',
            targetKey: 'item_id'
        });

        subSubCategoryItems.belongsTo(models.sub_sub_category, {
            foreignKey: 'sub_sub_category_id',
            targetKey: 'sub_sub_category_id'
        });

    };
    return subSubCategoryItems;
};
