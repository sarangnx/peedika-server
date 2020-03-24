const Cart = require('../helpers/cart');


/**
 * Add an item to the cart.
 * 
 * @param {Object} data - Data from Jwt middleware.
 * @param {Number} data.user_id - User ID
 * 
 * @param {Object} res.body - Data sent from the client.
 * @param {Number} res.body.item_id - ID of the item
 * to be added to the cart.
 * @param {Number} res.body.quantity - Quantity of Item selected.
 * @param {String} res.body.unit - Unit of the item.
 */
const addToCart = async (data, req, res, next) => {

    try {

        const item = req.body;
        item.user_id = data.data.user_id;

        // Add item to cart.
        const err = await Cart.addToCart(item);

        if( err instanceof Error ){
            throw err;
        }

        res.json({
            status: 'success',
            message: 'Item added to cart.'
        });

    } catch(err) {
        next(err);
    }

}

module.exports.addToCart = addToCart;


/**
 * 
 * @param {Object} req.body - Request Body, User Data
 * @param {Number} req.body.cart_id - Cart ID.
 * @param {Number} req.body.item_id - Item ID.
 * @param {Number} req.body.quantity - New Quantity.
 * @param {String} req.body.unit - unit of the quantity.
 */
const editCartItem = async (data, req, res, next) => {

    try {

        const item = req.body;

        const err = await Cart.editCartItem(item);

        if( err instanceof Error ){
            throw err;
        }

        res.json({
            status: 'success',
            message: 'edited item.'
        });

    } catch (err) {
        next(err);
    }

}

module.exports.editCartItem = editCartItem;


/**
 * Remove an item from cart.
 * 
 * @param {Object} req.param - Request Paramters.
 * @param {Number} req.param.cart_id - Cart ID.
 * @param {Number} req.param.item_id - Item ID.
 */
const removeFromCart = async (data, req, res, next) => {

    try {

        const item = req.params;

        // remove item from cart
        const err = await Cart.deleteCartItem(item);

        if( err instanceof Error ){
            throw err;
        }

        res.json({
            status: 'success',
            message: 'Item removed from cart.'
        });


    } catch(err){
        next(err);
    }

}

module.exports.removeFromCart = removeFromCart;


/**
 * View cart of a user using user_id.
 * 
 * @param {Number} data.data.user_id - User ID.
 */
const viewCart = async (data, req, res, next) => {

    try {

        const { user_id } = data.data;

        // get cart items.
        const cart = await Cart.viewCart(user_id);

        if( cart instanceof Error ){
            throw cart;
        }

        res.json({
            status: 'success',
            data: {
                cart
            }
        });

    } catch(err) {
        next(err);
    }
}

module.exports.viewCart = viewCart;


/**
 * Get the number of items in a user's cart.
 * 
 * @param {Number} data.data.user_id - User ID
 */
const count =  async (data, req, res, next) => {

    try {

        const { user_id } = data.data;

        // get count.
        const count = await Cart.count(user_id);

        if( count instanceof Error ){
            throw count;
        }

        res.json({
            status: 'success',
            data: {
                count
            }
        });

    } catch(err){
        next(err);
    }

}

module.exports.count = count;


/**
 * Move items in cart to orders.
 */
const checkout = async (data, req, res, next) => {

    try {

        const userdata = req.body;
        userdata.user_id = data.data.user_id;

        await Cart.checkout(userdata);

        res.io.emit('new-order', new Date());

        res.json({
            status: 'success',
            message: 'order placed'
        });

    } catch(err) {
        next(err);
    }

}

module.exports.checkout = checkout;
