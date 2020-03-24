/**
 * model: stocks
 */

module.exports = (sequelize, DataTypes) =>{
    const stocks = sequelize.define('stocks', {
        stock_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true,
            allowNull: false
        },
        item_id: {
            // item already contains store_id.
            // so no need for an extra column
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            // total quantity of the stock taken.
            type: DataTypes.DECIMAL(8,3),
            allowNull: false,
        },
        unit: {
            // Unit of the quantity.
            type: DataTypes.ENUM,
            values: [
                'g',
                'kg',
                'ml',
                'l',
                'count'
            ]
        },
        cost: {
            // Total cost of the stock.
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: 0
        },
        remaining_quantity: {
            type: DataTypes.DECIMAL(8,3),
            allowNull: false,
        },
        remaining_unit: {
            // Unit of the remaining quantity.
            type: DataTypes.ENUM,
            values: [
                'g',
                'kg',
                'ml',
                'l',
                'count'
            ]
        },
        arrival_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW'),
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
    stocks.associate = function(models) {
        stocks.belongsTo(models.inventory, {
            foreignKey: 'item_id',
            constraints: false,
            as: 'item'
        });

        // Associate with orders without any foreign key constraint.
        stocks.hasMany(models.orders, {
            foreignKey: 'store_id',
            constraints: false
        });
    };
    return stocks;
};
