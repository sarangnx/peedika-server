/**
 * model: inventory
 */

module.exports = (sequelize, DataTypes) => {
    const inventory = sequelize.define('inventory', {
        item_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        store_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        item_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        item_name_localization: {
            type: DataTypes.JSON,
            allowNull: true
        },
        attributes: {
            type: DataTypes.JSON,
            allowNull: true
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        quantity: {
            // defines a unit of the item.
            type: DataTypes.DECIMAL(8,3),
            allowNull: false,
            defaultValue: 1
        },
        unit: {
            // Base unit for defining quantity.
            type: DataTypes.ENUM,
            values: [
                'g',
                'kg',
                'ml',
                'l',
                'count'
            ],
            allowNull: false,
            defaultValue: 'count'
        },
        market_price: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: true
        },
        offer_price: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: true
        },
        image_path: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        coupon_code: {
            type: DataTypes.STRING(10),
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
    },{
        freezeTableName: true,
        paranoid:true,
        // Full Text Search Index
        indexes: [{
            type: 'FULLTEXT',
            fields: ['item_name']
        }]
    });
    inventory.associate = function(models) {
        inventory.belongsTo(models.stores, {
            foreignKey: 'store_id',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        inventory.belongsTo(models.brands, {
            foreignKey: 'brand_id',
            targetkey: 'brand_id',
            as: 'brand'
        });

        inventory.belongsToMany(models.category, {
            through: models.category_items,
            // field of junction table
            foreignKey: 'item_id',
            timestamps: false,
            as: 'category'
        });

        inventory.belongsToMany(models.offers, {
            through: models.offer_items,
            // field of junction table
            foreignKey: 'item_id',
            timestamps: false,
            as: 'offer'
        });

        inventory.hasMany(models.stocks, {
            foreignKey: 'item_id',
            constraints: false,
            as: 'stocks'
        });
    };
    return inventory;
};
