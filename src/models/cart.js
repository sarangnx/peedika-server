/**
 * model: cart
 * Schema similar to order.
 */

module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define('cart', {
        cart_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        added_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
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
    
    cart.associate = function(models) {
        
        //  An order can have many items.
        cart.hasMany(models.cart_details, {
            foreignKey: 'cart_id',
            as: 'items'
        });

        // Associate with user to get user deatils
        cart.belongsTo(models.users, {
            foreignKey: 'user_id',
            // Creating an association without a foreign key constraint.
            constraints: false
        });

    };
    return cart;
};
