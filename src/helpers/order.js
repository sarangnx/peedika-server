const _ = require('lodash');

const Orders = require('../models').orders;
const OrderDetails = require('../models').order_details;
const Inventory = require('../models').inventory;
const Localbodies = require('../models').localbodies;
const Users = require('../models').users;
const Sequelize = require('../models').Sequelize;
const sequelize = require('../models').sequelize;

const Utils = require('./utils');


/**
 * Place order for any quantity of a single item.
 * This method is invoked when user clicks Buy Now
 * button of an item/product.
 *
 * @param {Object} data - Details of order.
 * @param {Number} data.user_id - User ID.
 * @param {Number} data.store_id - Store ID.
 * @param {Number} data.item_id - Item ID.
 * @param {Number} data.quantity - Quantity of the item.
 * @param {String} data.unit - Unit of the item quantity.
 * @param {String} data.address1 - Address line 1
 * @param {String} data.address2 - Address line 2
 * @param {String} data.address3 - Address line 3
 * @param {String} data.city - City
 * @param {String} data.district - District
 * @param {String} data.state - State
 * @param {String} data.pincode - Pincode
 * @param {String} data.landmark - Landmark
 * @param {String} data.phone - Phone Number
 */
const placeOrder = async (data) => {

    let transaction;

    try {

        // Start a transaction.
        transaction = await sequelize.transaction();

        Utils.required([
            'user_id',
            'store_id',
            'item_id',
            'quantity',
            'unit'
        ], data);

        // convert floating values to int in case of 'count' unit
        if(data.unit === 'count') {
            data.quantity = parseInt(data.quantity);
        }

        // set date of order
        data.order_date = new Date();

        // format address
        data.delivery_address = Utils.formatAddress(data);

        // If delivery address is empty, copy address from profile.
        if( _.isEmpty(data.delivery_address) ){
            const user = await Users.findOne({
                where: {
                    user_id: data.user_id
                }
            });

            data.delivery_address = _.pick(user, [
                'house',
                'ward',
                'area',
                'landmark',
                'district',
                'pincode',
                'phone'
            ]);
        }

        // generate invoice number
        data.invoice_number = Utils.generateInvoiceNumber({
            store_id: data.store_id,
            user_id: data.user_id
        });

        // create an order.
        const order = await Orders.create(data, { transaction });


        // find the item ordered by the user.
        let item = await Inventory.findOne({
            where: {
                item_id: data.item_id
            },
        });

        item = item.dataValues;

        /**
         * Unit price needs to be saved in the order,
         * because prices tend to change (offers).
         */
        let unit_price;

        // If offer price is set, use it.
        if( item.offer_price ){
            unit_price = item.offer_price;
        } else {
            // Otherwise use original price.
            unit_price = item.market_price;
        }

        // Add items to order.
        await OrderDetails.create({
            order_id: order.order_id,
            item_id: data.item_id,
            unit_price,
            quantity: data.quantity,
            unit: data.unit
        }, { transaction });

        // commit the transaction to the database.
        await transaction.commit();

    } catch(err) {

        // If a transaction is started, Rollback
        if( transaction ){
            await transaction.rollback();
        }

        throw err;
    }

}

module.exports.placeOrder = placeOrder;


/**
 * Create an entry in the orders table.
 * This method is used to make bulk checkout.
 * That is, include numerous items in a single order.
 *
 * @param {Object} data - Details of order.
 * @param {Number} data.user_id - User ID.
 * @param {Number} data.store_id - Store ID.
 * @param {String} data.address1 - Address line 1
 * @param {String} data.address2 - Address line 2
 * @param {String} data.address3 - Address line 3
 * @param {String} data.city - City
 * @param {String} data.district - District
 * @param {String} data.state - State
 * @param {String} data.pincode - Pincode
 * @param {String} data.landmark - Landmark
 * @param {String} data.phone - Phone Number
 *
 * @returns {Number} store_id
 */
const createOrder = async (data, transaction) => {

    try {

        Utils.required([
            'user_id',
            'store_id',
        ], data);

        // set date of order
        data.order_date = new Date();

        // format address
        data.delivery_address = Utils.formatAddress(data);

        // If delivery address is empty, copy address from profile.
        if( _.isEmpty(data.delivery_address) ){
            const user = await Users.findOne({
                where: {
                    user_id: data.user_id
                }
            });

            data.delivery_address = _.pick(user, [
                'house',
                'ward',
                'area',
                'landmark',
                'district',
                'pincode',
                'phone'
            ]);
        }

        // generate invoice number
        data.invoice_number = Utils.generateInvoiceNumber({
            store_id: data.store_id,
            user_id: data.user_id
        });

        // create an order.
        const order = await Orders.create(data, { transaction });

        return order.order_id;

    } catch(err) {
        throw err;
    }

}

module.exports.createOrder = createOrder;


/**
 * Add items to an order.
 * Used with createOrder method.
 *
 * @param {Object} data - Item details.
 * @param {Number} data.order_id - Order ID. returned from createOrder().
 * @param {Number} data.item_id - Item ID.
 * @param {Number} data.quantity - Quantity of the item.
 * @param {String} data.unit - Unit of the item quantity.
 */
const addItemsToOrder = async (data, transaction) => {

    try {

        // find the item ordered by the user.
        const item = await Inventory.findOne({
            where: {
                item_id: data.item_id
            }
        });

        // convert floating values to int in case of 'count' unit
        if(data.unit === 'count') {
            data.quantity = parseInt(data.quantity);
        }

        /**
         * Unit price needs to be saved in the order,
         * because prices tend to change (offers).
         */
        let unit_price;

        // If offer price is set, use it.
        if( item.offer_price ){
            unit_price = item.offer_price;
        } else {
            // Otherwise use original price.
            unit_price = item.market_price;
        }


        // Add items to order.
        await OrderDetails.create({
            order_id: data.order_id,
            item_id: data.item_id,
            unit_price,
            quantity: data.quantity,
            unit: data.unit
        }, { transaction });

        // commit the transaction to the database in calling function.

    } catch(err) {
        throw err;
    }

}

module.exports.addItemsToOrder = addItemsToOrder;


/**
 * Contains status codes for Order status.
 */
const status = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    READY: 'READY',
    OUTFORDELIVERY: 'OUTFORDELIVERY',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
};

module.exports.status = status;


/**
 * View Orders. Takes an object argument.
 * This method can be used to retrieve list of order
 *  - by Order ID - Specific order
 *  - by User ID - Orders of a user.
 *  - by Store ID - Orders given to a store.
 * Only one of the any three arguments must be used.
 *
 * @param {Object} options
 * @param {Number} options.order_id - Order ID
 * @param {Number} options.user_id - user ID
 * @param {Number} options.store_id - Store ID
 * @param {String} options.order_status - Status of the order.
 * @param {String} options.order_by - Sorting order.
 * @param {Number} options.offset - Page number.
 * @param {Number} options.limit - Orders per page.
 */
const viewOrder = async ({ order_id, user_id, store_id, order_status, order_by, offset, limit, district }) => {

    try {

        let where, sort;

        // select any one of the three arguments.
        if( order_id ){
            where = {
                order_id
            };
        } else if ( user_id ) {
            where = {
                user_id
            };
        } else if ( store_id ) {
            where = {
                store_id
            }
        } else {
            throw new Error('Atleat one argument required.');
        }

        // Add order status if given.
        if( order_status ){
            where = Object.assign({}, where, {
                order_status
            });
        }

        // Set sort order. default: DESC
        if( order_by ){
            sort = {
                order: [
                    ['order_date', order_by]
                ]
            }
        }

        // Find the orders based on the criteria provided
        // by 'where' option.
        let orders = await Orders.findAndCountAll({
            where,
            ...sort,
            include: [{
                model: OrderDetails,
                as: 'items',
                include: [{
                    model: Inventory,
                    as: 'item_details'
                }]
            },{
                model: Users,
                as: 'user',
                attributes: {
                    exclude: [
                        'roles',
                        'usergroup',
                        'password',
                        'createdAt',
                        'updatedAt',
                        'deletedAt',
                    ]
                },
                include: [{
                    model: Localbodies,
                    as: 'localbody',
                    ...(district && {
                        where: {
                            district
                        },
                        required: true
                    }),
                }],
                required: true
            }],
            offset,
            limit
        });

        // if no orders, return null
        if( orders.count === 0 ){
            return orders
        }

        // Find the count seperately, because, findAndCountAll returns count of joins too.
        // simply taking length of orders.rows won't work either, becuase we use limits.
        const count = await Orders.count({
            where
        });

        orders.count = count;

        return orders;

    } catch (err) {
        throw err;
    }
}

module.exports.viewOrder = viewOrder;


/**
 * Cancel an order, and set status to cancelled.
 *
 * @param {Number} order_id - Order ID
 */
const cancelOrder = async (order_id) => {

    let transaction;

    try {

        // Start a transaction.
        transaction = await sequelize.transaction();

        if( !order_id ){
            throw new Error('order_id required.');
        }

        let order = await Orders.findOne({
            where: {
                order_id,
                order_status: {
                    [Sequelize.Op.ne]: 'CANCELLED'
                }
            },
            include: [{
                model: OrderDetails,
                as: 'items',
            }],
        });

        if(!order) {
            throw new Error('Order already cancelled');
        }


        // Set order_status to CANCELLED.
        await order.set('order_status', 'CANCELLED');
        await order.save({ transaction });

        await transaction.commit();

    } catch(err) {

        // If a transaction is started, Rollback
        if( transaction ){
            await transaction.rollback();
        }

        throw err;
    }

}

module.exports.cancelOrder = cancelOrder;


/**
 * Change order status.
 * @param {String} status - Order status
 */
const changeStatus = async(order_id, order_status) => {

    try {

        if( !order_id ){
            throw new Error('order_id required.');
        }

        // find the order
        const order = await Orders.findOne({
            where: {
                order_id
            }
        });

        // set order status in case it is not cancelled.
        if ( order.order_status === 'CANCELLED' ) {
            throw new Error('Cannot change status of Cancelled Orders');
        } else if ( order_status !== 'CANCELLED' ) {
            await order.set('order_status', order_status);
            await order.save();
        } else if ( order_status === 'CANCELLED' ) {
            // to set order status to cancelled, call cancelOrder.
            await cancelOrder(order_id);
        }


    } catch(err) {
        throw err;
    }

}

module.exports.changeStatus = changeStatus;


/**
 * Get stats like number of orders, orders per day etc..
 *
 * @param {Number} store_id - Store ID.
 */
const getStats = async(store_id) => {

    try{

        if( !store_id ){
            throw new Error('Store ID required.');
        }

        const where = {
            store_id
        };

        /***
         * Get count of orders:
         * - ALL
         * - ALL TODAY
         * - PENDING
         * - PROCESSING
         * - READY
         * - OUTFORDELIVERY
         * - DELIVERED
         * - CANCELLED
         */
        const total = await Orders.count({ where });

        const today = new Date();
        const midnight = new Date();
        midnight.setHours(0);
        midnight.setMinutes(0);
        midnight.setSeconds(0);

        const total_today = await Orders.count({
            where: {
                ...where,
                order_date: {
                    [Sequelize.Op.between]: [midnight, today]
                }
            }
        });

        const pending = await Orders.count({
            where: {
                ...where,
                order_status: status.PENDING
            }
        });

        const processing = await Orders.count({
            where: {
                ...where,
                order_status: status.PROCESSING
            }
        });

        const ready = await Orders.count({
            where: {
                ...where,
                order_status: status.READY
            }
        });

        const outfordelivery = await Orders.count({
            where: {
                ...where,
                order_status: status.OUTFORDELIVERY
            }
        });

        const delivered = await Orders.count({
            where: {
                ...where,
                order_status: status.DELIVERED
            }
        });

        const cancelled = await Orders.count({
            where: {
                ...where,
                order_status: status.CANCELLED
            }
        });

        return {
            total,
            total_today,
            pending,
            processing,
            ready,
            outfordelivery,
            delivered,
            cancelled
        }

    } catch(err) {
        throw err;
    }
}

module.exports.getStats = getStats;

/**
 * Delete an order and order_details associated with it.
 * @param {Number} order_id - Order ID
 */
module.exports.deleteOrder = async function(order_id) {
    let transaction
    try {
        // Start a transaction.
        transaction = await sequelize.transaction();

        await OrderDetails.destroy({
            where: {
                order_id,
            }
        },{ force: true, transaction });

        await Orders.destroy({
            where: {
                order_id,
            }
        },{ force: true, transaction });

        await transaction.commit();
    
    } catch(err) {
        // If a transaction is started, Rollback
        if( transaction ){
            await transaction.rollback();
        }

        throw err;
    }
}
