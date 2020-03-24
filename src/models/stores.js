/**
 * model: storeDetails
 */

module.exports = (sequelize, DataTypes) =>{
    const stores = sequelize.define('stores', {
        store_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true,
            allowNull: false
        },
        address: {
            type: DataTypes.JSON,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(225),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        gst: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        rating: {
            type: DataTypes.REAL(2,1),
            allowNull: true
        },
        opening_time: {
            type: DataTypes.TIME,
            allowNull: true
        },
        closing_time: {
            type: DataTypes.TIME,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
        }
    }, { freezeTableName: true, paranoid:true });
    stores.associate = function(models) {
        stores.belongsToMany(models.users, {
            through: models.store_owners,
            // field of junction table
            foreignKey: 'store_id',
            timestamps: false,
            as: 'owner'
        });

        // Associate with orders without any foreign key constraint.
        stores.hasMany(models.orders, {
            foreignKey: 'store_id',
            constraints: false
        });
    };
    return stores;
};
