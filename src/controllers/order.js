const Order = require('../helpers/order');

const IMAGE_BASE_URL = '/images/inventory/';

/**
 * Place a new order by a user.
 * user_id is taken from the jwtToken 'data'.
 * remaining data is taken from 'req.body'.
 */
const placeOrder = async (data, req, res, next) => {

    try {

        // Get data of the order.
        const order = req.body;
        order.user_id = data.data.user_id;

        // store it to database.
        await Order.placeOrder(order);

        res.io.emit('new-order', new Date());

        res.json({
            status: 'success',
            message: 'order placed.'
        });

    } catch(err) {
        next(err);
    }

}

module.exports.placeOrder = placeOrder;


/**
 * Cancel an order using order_id
 */
const cancelOrder = async (data, req, res, next) => {

    try {

        const { order_id } = req.params;

        await Order.cancelOrder(order_id);

        res.io.emit('cancel-order', new Date());

        res.json({
            status: 'success',
            message: 'order cancelled.'
        });

    } catch(err) {
        next(err);
    }
}

module.exports.cancelOrder = cancelOrder;


/**
 * View order details.
 * any one of order_id, store_id and user_id is to be passed.
 * 
 * @param {Object} req.query - Query Parameters.
 * @param {Number} req.query.order_id - Order ID.
 * @param {Number} req.query.store_id - Store ID.
 * @param {Number} req.query.user_id - user ID.
 * @param {String} req.query.order_status - Order Status.
 * @param {Number} req.query.page - Page Number.
 * @param {Number} req.query.per_page - Number of items in a page.
 * @param {String} req.query.order_by - Sorting order.
 */
const viewOrder = async (data, req, res, next) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 10;

        const offset = ( page - 1 ) * per_page;

        const options = {
            order_id: req.query.order_id ? req.query.order_id : null,
            user_id: req.query.user_id ? req.query.user_id : null,
            store_id: req.query.store_id ? req.query.store_id : null,
            order_status: req.query.order_status ? req.query.order_status : null,
            offset,
            limit: per_page,
            order_by: req.query.order_by ? req.query.order_by : 'DESC'
        };

        const orders = await Order.viewOrder(options);

        /***
         * =======================
         * Set Pagination data
         * =======================
         */

        // if current page is 1, prev_page = null
        const prev_page = (page > 1) ?
            `/api/order/view?user_id=${ options.user_id || '' }&` + 
            `order_id=${ options.order_id || '' }&` +
            `store_id=${options.store_id || '' }&` +
            `page=${page - 1}&` +
            `per_page=${per_page}` : null;


        // if current page is last page, next_page = null
        const next_page = page < Math.ceil(orders.count/per_page) ?
            `/api/order/view?user_id=${ options.user_id || '' }&` + 
            `order_id=${ options.order_id || '' }&` +
            `store_id=${options.store_id || '' }&` +
            `page=${page + 1}&` +
            `per_page=${per_page}` : null;

        
        // if current page is last page, next_page = null
        const jump_page = `/api/order/view?user_id=${ options.user_id || '' }&` + 
            `order_id=${ options.order_id || '' }&` +
            `store_id=${ options.store_id || '' }&`;


        Object.assign(orders, {
            total_pages: Math.ceil(orders.count/per_page),
            per_page: per_page,
            current_page: page,
            prev_page,
            next_page,
            jump_page,
            base_url: IMAGE_BASE_URL
        });

        res.json({
            status: 'success',
            data: {
                orders,
            }
        });

    } catch(err) {
        next(err);
    }

}

module.exports.viewOrder = viewOrder;


/**
 * Change status of an order.
 * 
 * @param {String} req.body.order_id - Order ID.
 * @param {String} req.body.status - Order status.
 */
const changeStatus = async (data, req, res, next) => {

    try {

        const { status, order_id } = req.body;

        await Order.changeStatus(order_id, status);

        res.io.emit('status-change-order', new Date());

        res.json({
            status: 'success',
            message: 'status changed.'
        });

    } catch(err) {
        next(err);
    }
}

module.exports.changeStatus = changeStatus;


/**
 * Get order stats.
 * 
 * @param {Number} req.query.store_id
 */
const getStats = async (data, req, res, next) => {

    try {

        const { store_id } = req.query;

        const stats = await Order.getStats(store_id);

        res.json({
            status: 'success',
            data: {
                stats
            }
        });

    } catch(err) {
        next(err);
    }

}

module.exports.getStats = getStats;
