/**
 * Junction Table Connecting Users (Owner) and Stores.
 */

module.exports = (sequelize, DataTypes) => {
    const storeOwners = sequelize.define('store_owners', {
        entry_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        store_owner_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        store_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }, { timestamps: false, freezeTableName: true });

    storeOwners.associate = function(models) {

        storeOwners.belongsTo(models.users, {
            foreignKey: 'store_owner_id',
            targetKey: 'user_id'
        });

        storeOwners.belongsTo(models.stores, {
            foreignKey: 'store_id',
            targetKey: 'store_id'
        });

    };
    return storeOwners;
};
