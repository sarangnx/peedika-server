/**
 * Junction Table Connecting Sub categories and items.
 */

module.exports = (sequelize, DataTypes) => {
    const subCategoryItems = sequelize.define('sub_category_items', {
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
        sub_category_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }, { timestamps: false, freezeTableName: true });

    subCategoryItems.associate = function(models) {

        subCategoryItems.belongsTo(models.inventory, {
            foreignKey: 'item_id',
            targetKey: 'item_id'
        });

        subCategoryItems.belongsTo(models.sub_category, {
            foreignKey: 'sub_category_id',
            targetKey: 'sub_category_id'
        });

    };
    return subCategoryItems;
};
