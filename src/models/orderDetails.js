/**
 * model: order_details
 * Stores the items included in an order.
 */

module.exports = (sequelize, DataTypes) => {
    const order_details = sequelize.define('order_details', {
        entry_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        order_id: {
            // foreign_key to orders table
            type: DataTypes.INTEGER,
            allowNull: false
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unit_price: {
            // price at the time of order.
            type: DataTypes.DECIMAL(8,2),
            allowNull: true
        },
        quantity: {
            // Quantity specified by the user.
            type: DataTypes.DECIMAL(8,3),
            allowNull: false
        },
        unit: {
            // Unit of the quantity specified by the user.
            type: DataTypes.ENUM,
            values: [
                'g',
                'kg',
                'ml',
                'l',
                'count'
            ]
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
        }
    }, { timestamps: true, freezeTableName: true, paranoid:true });
    
    order_details.associate = function(models) {
        // Each order details belongs to an order.
        // An order can have more than one order_details
        order_details.belongsTo(models.orders, {
            foreignKey: 'order_id',
            onDelete: 'cascade'
        });

        // Associate with inventory to get item deatils
        order_details.belongsTo(models.inventory, {
            foreignKey: 'item_id',
            // Creating an association without a foreign key constraint.
            constraints: false,
            as: 'item_details'
        });
    };
    return order_details;
};
