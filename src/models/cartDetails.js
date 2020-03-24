/**
 * model: cart_details
 * Schema similar to order_details
 */

module.exports = (sequelize, DataTypes) => {
    const cart_details = sequelize.define('cart_details', {
        entry_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        cart_id: {
            // foreign_key to carts table
            type: DataTypes.INTEGER,
            allowNull: false
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false
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
    }, { timestamps: true, freezeTableName: true });
    
    cart_details.associate = function(models) {
        // Each cart_details belongs to an cart item.
        // An cart can have more than one cart_details.
        cart_details.belongsTo(models.cart, {
            foreignKey: 'cart_id',
            onDelete: 'cascade'
        });

        // Associate with inventory to get item deatils
        cart_details.belongsTo(models.inventory, {
            foreignKey: 'item_id',
            // Creating an association without a foreign key constraint.
            constraints: false,
            as: 'item_details'
        });
    };
    return cart_details;
};
