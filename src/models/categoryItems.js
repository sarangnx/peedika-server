/**
 * Junction Table Connecting Categories and Inventory.
 */

module.exports = (sequelize, DataTypes) => {
    const categoryItems = sequelize.define('category_items', {
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
        category_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }, { timestamps: false, freezeTableName: true });

    categoryItems.associate = function(models) {

        categoryItems.belongsTo(models.inventory, {
            foreignKey: 'item_id',
            targetKey: 'item_id'
        });

        categoryItems.belongsTo(models.category, {
            foreignKey: 'category_id',
            targetKey: 'category_id'
        });

    };
    return categoryItems;
};
