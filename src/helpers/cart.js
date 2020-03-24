const Stocks = require('./stocks');

const Cart = require('../models').cart;
const CartDetails = require('../models').cart_details;
const Inventory = require('../models').inventory;

const sequelize = require('../models').sequelize;
const Order = require('./order');
const required = require('./utils').required;
const calculatePrice = require('./utils').calculatePrice;

/**
 * Add a single item to a user's cart.
 * 
 * @param {Object} data - Item details.
 * @param {Number} data.user_id - User ID
 * @param {Number} data.item_id - ID of the item
 * to be added to the cart.
 * @param {Number} data.quantity - Quantity of Item selected.
 * @param {String} data.unit - Unit of the item.
 */
const addToCart = async ( data = {} ) => {

    try {

        // throw error if the properties / arguments are not passed.
        required([
            'user_id',
            'item_id',
            'quantity',
            'unit'
        ], data);

        // convert floating values to int in case of 'count' unit
        if(data.unit === 'count') {
            data.quantity = parseInt(data.quantity);
        }

        // Add date to item.
        data.added_date = new Date();

        /***
         * Check and retrieve an entry in cart
         * and the items added to it if any,
         * for the user_id.
         * A user can have only a single cart at a time.
         * 
         * All items are added to a single cart for a user_id.
         */
        let cart = await Cart.findOne({
            where: {
                user_id: data.user_id
            },
            include: [{
                model: CartDetails,
                as: 'items'
            }]
        });


        /***
         * If a cart is already present for a user,
         * add new items to the cart.
         */
        if( cart ){

            // check if the item is already added to the cart.
            const item = cart.items.find((item) => {
                return item.item_id == data.item_id;
            });

            // if the item is already in the cart, don't add.
            if( item ) {
                throw new Error('Item already added to cart.');
            }

            // Adding items to existing cart.
            await CartDetails.create({
                cart_id: cart.cart_id,
                item_id: data.item_id,
                quantity: data.quantity,
                unit: data.unit
            });

        } else {

            /**
             * If cart is not present, create one,
             * and add items to the cart.
             */

            // Create new cart, and add items through include.
            cart = await Cart.create({
                added_date: data.added_date,
                user_id: data.user_id,
                items:[{
                    item_id: data.item_id,
                    quantity: data.quantity,
                    unit: data.unit,
                }]
            },{
                include:[{
                    model: CartDetails,
                    as: 'items'
                }]
            });

        }

    } catch(err) {
        throw err;
    }
    
}

module.exports.addToCart = addToCart;


/**
 * Edit data of an item in the cart.
 * This method is intended for incrementing,
 * decrementing or changing quantity of an item,
 * already in the cart.
 * 
 * PS: This method is not for deleting items or
 * adding new items to cart.
 * 
 * @param {Object} data - Item Details
 * @param {Number} data.cart_id - Cart ID
 * @param {Number} data.item_id - Item ID
 * @param {Number} data.quantity - New Quantity of item.
 * @param {String} data.unit - Unit of the quantity.
 */
const editCartItem = async ( data = {} ) => {

    try {

        required([
            'cart_id',
            'item_id',
            'quantity',
            'unit'
        ], data);

        // Update the quantity of item
        await CartDetails.update({
            quantity: data.quantity,
            unit: data.unit
        },{
            where: {
                cart_id: data.cart_id,
                item_id: data.item_id
            }
        });

    } catch(err) {
        throw err;
    }

}

module.exports.editCartItem = editCartItem;


/**
 * Remove an item from the cart.
 * If no items are remaining in the cart,
 * delete the cart.
 * 
 * @param {Object} data - Details of item to be removed.
 * @param {Object} data.cart_id - Cart ID.
 * @param {Object} data.item_id - Item ID.
 */
const deleteCartItem = async ( data = {}, transaction) => {

    try {

        required([
            'cart_id',
            'item_id'
        ], data);

        // Delete item from the cart.
        await CartDetails.destroy({
            where: {
                cart_id: data.cart_id,
                item_id: data.item_id
            }
        }, { transaction });

        // find the cart.
        const cart = await Cart.findOne({
            where: {
                cart_id: data.cart_id,
            },
            include: [{
                model: CartDetails,
                as: 'items'
            }]
        });


        // If no items are remaining in the cart, delete it.
        if( cart && !cart.items.length ){
            await cart.destroy({ transaction });
        }

    } catch(err) {
        throw err;
    }

}

module.exports.deleteCartItem = deleteCartItem;


/**
 * View items in a user's cart.
 * Since a user is supposed to have only a single cart,
 * at a time, user_id is sufficient for getting details.
 * 
 * @param {Number} user_id - User ID
 * 
 * @returns {Object} Cart with the details
 * of items in the cart.
 */
const viewCart = async (user_id) => {

    try {

        if( !user_id ){
            throw new Error('user_id required.');
        }

        // Find cart of a user.
        let cart = await Cart.findOne({
            where: {
                user_id
            },
            include: [{
                model: CartDetails,
                as: 'items',
                include: [{
                    model: Inventory,
                    as: 'item_details'
                }]
            }]
        });

        // if no items in cart return null
        if( !cart ) {
            return null
        }

        cart = cart.dataValues;

        cart.items = cart.items.map((item) => {
            item = item.dataValues;

            // set base price.
            // if offer price < market price : base price = offer price
            let base_price;
            if(item.item_details.offer_price && item.item_details.offer_price < item.item_details.market_price){
                base_price = item.item_details.offer_price;
            } else {
                base_price = item.item_details.market_price;
            }

            // calculate total price of the user given quantity.
            item.total_price = calculatePrice({
                base_price,
                base_quantity: item.item_details.quantity,
                base_unit: item.item_details.unit,
                quantity: item.quantity,
                unit: item.unit
            });

            return item;
        });

        return cart;

    } catch(err) {
        throw err;
    }

}

module.exports.viewCart = viewCart;


/**
 * Get the number of items in a user's cart.
 * 
 * @param {Number} user_id - User ID
 */
const count = async (user_id) => {

    try {

        if( !user_id ){
            throw new Error('user_id required.');
        }

        // get the count.
        const itemCount = Cart.count({
            where: {
                user_id
            },
            include: [{
                model: CartDetails,
                as: 'items',
            }]
        });

        return itemCount;

    } catch(err){
        throw err;
    }

}

module.exports.count = count;


/**
 * Checkout. Move all items from cart to orders.
 * 
 * @param {Number} user_id - User ID.
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
const checkout = async (data) => {

    try {

        // get items for cart.
        const cart = await Cart.findOne({
            where: {
                user_id: data.user_id
            },
            include: [{
                model: CartDetails,
                as: 'items',
                include: [{
                    model: Inventory,
                    as: 'item_details'
                }]
            }]
        });

        if( !cart || !cart.items ){
            throw new Error('No items in cart.');
        }

        // prepare items for adding to orders table.
        const items = cart.items.map((item) => {
            let order_item = {
                cart_id: item.cart_id,
                user_id: data.user_id,
                store_id: item.item_details.store_id,
                item_id: item.item_id,
                quantity: item.quantity,
                unit: item.unit
            };
            
            return order_item;
        });


        // group items based on store_id.
        const itemgroups = items.reduce((accumulator, current) => {
            // accumulate items in an array of objects, with store_id as object keys.
            // If key with store_id is in accumulator, push current item to corresponding array.
            // else create a key an start an array.
            accumulator[current.store_id] = (accumulator[current.store_id] || []).concat(current);

            return accumulator;

        },{});


        // 💡 Tip: creating variables inside a for loop is not wise.
        let order_id;
        let itemgroup;

        // Add items to orders.
        for( let key in itemgroups ){

            itemgroup = itemgroups[key];
            
            let transaction;
            try {

                // start a transaction
                transaction = await sequelize.transaction();

                // create an entry in the orders table for each store.
                order_id = await Order.createOrder({
                    user_id: itemgroup[0].user_id,
                    store_id: itemgroup[0].store_id,
                    address1: data.address1,
                    address2: data.address2,
                    address3: data.address3,
                    city: data.city,
                    district: data.district,
                    state: data.state,
                    pincode: data.pincode,
                    landmark: data.landmark,
                    phone: data.phone,
                }, transaction);

                // loop through array of items and add then to order_details.
                for( let item of itemgroup ){
                    
                    // Check the stock availability of item.
                    if( await Stocks.checkStock({
                        item_id: item.item_id,
                        quantity: item.quantity,
                        unit: item.unit
                    }) === false ) {
                        throw new Error('Item out of stock');
                    }

                    // add item to order_details
                    await Order.addItemsToOrder({
                        order_id: order_id,
                        item_id: item.item_id,
                        quantity: item.quantity,
                        unit: item.unit,
                    }, transaction);

                    // remove item from cart
                    await deleteCartItem({
                        cart_id: item.cart_id,
                        item_id: item.item_id
                    }, transaction);
                }

                await transaction.commit();

            } catch(err) {

                // If a transaction is started, Rollback
                if( transaction ){
                    await transaction.rollback();
                }

                throw err;
            }

        }

    } catch(err) {
        throw err;
    }

}

module.exports.checkout = checkout;
