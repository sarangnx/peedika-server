/**
 * model: order
 */

module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define('orders', {
        order_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        delivery_address: {
            type: DataTypes.JSON,
            allowNull: false
        },
        invoice_number: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        store_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        delivery_method: {
            /***
             * Offer the users two options for
             * receiving the product:
             * PICKUP - user go to the store and pickup.
             * HOMEDELIVERY - order is delivered to home.
             */
            type: DataTypes.ENUM,
            values: [
                'PICKUP',
                'HOMEDELIVERY'
            ],
            defaultValue: 'HOMEDELIVERY'
        },
        payment_method: {
            type: DataTypes.ENUM,
            values: ['COD', 'GPAY', 'PHONEPE'],
            defaultValue: 'COD'
        },
        order_status: {
            type: DataTypes.ENUM,
            values: [
                'PENDING', // Shop did not see the order.
                'PROCESSING', // Shop saw the order and started packing.
                'READY', // The order is ready for delivery or pickup.
                'OUTFORDELIVERY', // The order is taken out for delivery.
                'DELIVERED', // The order is delivered to the customer.
                'CANCELLED' // Order is cancelled.
            ],
            defaultValue: 'PENDING'
        },
        deliver_by: {
            // allow users to prolong the delivery date to a desired date.
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
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
    }, { timestamps: true, freezeTableName: true, paranoid:true });
    
    orders.associate = function(models) {
        
        //  An order can have many items.
        orders.hasMany(models.order_details, {
            foreignKey: 'order_id',
            as: 'items'
        });

        // Associate with user to get user deatils
        orders.belongsTo(models.users, {
            foreignKey: 'user_id',
            // Creating an association without a foreign key constraint.
            constraints: false,
            as: 'user'
        });

        // Associate with store to get store deatils
        orders.belongsTo(models.stores, {
            foreignKey: 'store_id',
            // Creating an association without a foreign key constraint.
            constraints: false
        });

    };
    return orders;
};
