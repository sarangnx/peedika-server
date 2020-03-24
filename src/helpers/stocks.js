const Stocks = require('../models').stocks;
const Inventory = require('../models').inventory;
const Sequelize = require('../models').Sequelize;

const required = require('./utils').required;
const Utils = require('./utils');
const convert = require('convert-units');

/***
 * Limit conversion to 'ml', 'l', 'g', 'kg' only.
 */
const unitexclude = [ 'mcg', 'mg', 'mt', 'oz', 'lb', 't', 'mm3', 'cm3', 'ml', 'cl', 'dl', 'kl', 'm3', 'km3', 'krm', 'tsk', 'msk', 'kkp', 'glas', 'kanna', 'tsp', 'Tbs', 'in3', 'fl-oz', 'cup', 'pnt', 'qt', 'gal', 'ft3', 'yd3'];


/**
 * Add new stocks of an item to the database.
 * 
 * @param {Object} data
 * @param {Number} data.item_id - Item ID.
 * @param {Number} data.quantity - Total Quantity of the item.
 * @param {String} data.unit - Unit of the quantity.
 * @param {Number} data.cost - total cost of the new item stock.
 * @param {String} data.arrival_date - (YYYY-MM-DD) Date of arrival of new stock.
 */
const addStocks = async (data) => {

    try{

        required([
            'item_id',
            'quantity',
            'unit',
            'arrival_date'
        ], data);

        // set remaining quantity to total quantity initially.
        data.remaining_quantity = data.quantity;
        data.remaining_unit = data.unit;

        await Stocks.create(data);

    } catch(err) {
        throw err;
    }
}

module.exports.addStocks = addStocks;


/**
 * Update stock info.
 * 
 * @param {Object} data - Data to be changed.
 */
const editStocks = async (data) => {

    try {

        required(['stock_id'], data);

        // update database with new data.
        await Stocks.update(data,{
            fields: [
                'quantity',
                'unit',
                'cost',
                'remaining_quantity',
                'remaining_unit',
                'arrival_date'
            ],
            where: {
                stock_id: data.stock_id
            }
        });

    } catch(err) {
        throw err;
    }
}

module.exports.editStocks = editStocks;


/**
 * Force Delete a stock from the database.
 * 
 * @param {Number} stock_id - Stock ID.
 */
const deleteStocks = (stock_id) => {

    try {

        Stocks.destroy({
            where: {
                stock_id
            },
            // delete paranoid
            force: true
        });

    } catch(err){
        throw err;
    }

}

module.exports.deleteStocks = deleteStocks;


/**
 * Expire a stock. Soft Delete a stock from the database.
 * 
 * @param {Number} stock_id - Stock ID.
 */
const expireStocks = (stock_id) => {

    try {

        Stocks.destroy({
            where: {
                stock_id
            },
        });

    } catch(err){
        throw err;
    }

}

module.exports.expireStocks = expireStocks;


/**
 * Increment the remaining quantity,
 * when an order is cancelled.
 * @param {Object} data
 * @param {Number} data.stock_id - Stock ID.
 * @param {Number} data.quantity - Quantity of item to be added.
 * @param {String} data.unit - Unit of the quantity.
 */
const increment = async (data) => {

    try {

        // find the stock.
        const stock = await Stocks.findOne({
            where: {
                stock_id: data.stock_id
            }
        });

        // get remaining quantity and unit from stock.
        let { remaining_quantity, remaining_unit } = stock;
        remaining_quantity = parseFloat(remaining_quantity).toFixed(3);


        // quantity supplied by user.
        let quantity = parseFloat(data.quantity).toFixed(3);

        // If unit is count, no need to convert quantity.
        if( data.unit !== 'count' ){
            // convert the quantity from user given unit to
            // unit in the stock database.
            quantity = convert(data.quantity).from(data.unit).to(remaining_unit);
        }

        quantity = parseFloat(quantity).toFixed(3);

        // increment the remaining quantity by user quantity.
        remaining_quantity = remaining_quantity + quantity;

        
        // convert quantity to best fitting quantity
        if( remaining_unit !== 'count' ){
            let conversion;
            conversion = convert(remaining_quantity).from(remaining_unit).toBest({ exclude: unitexclude });
            remaining_quantity = conversion.val;
            remaining_unit = conversion.unit;
        }


        // save it to the database.
        await stock.set('remaining_quantity', remaining_quantity);
        await stock.set('remaining_unit', remaining_unit);


        // Remaining quantity cannot be incremented beyond total quantity.
        if( stock.remaining_quantity > stock.quantity ) {
            throw new Error('Cannot increment beyond total quantity');
        }

        await stock.save();

    } catch(err) {
        throw err;
    }

}

module.exports.increment = increment;


/**
 * Get list of all stocks.
 * 
 * @param {Object} options - Pagination data
 * @param {Number} options.offset - The row from which find is to be started.
 * @param {Number} options.limit - Number of rows to be returned.
 */
const getAllStocks = async ( offset = 0, limit = 20 ) => {

    try {

        const stocks = await Stocks.findAndCountAll({
            include: [{
                model: Inventory,
                as: 'item',
                attributes: [
                    'item_id',
                    'store_id',
                    'item_name',
                ]
            }],
            offset,
            limit,
            order: [
                ['arrival_date','DESC']
            ]
        });

        return {
            stocks: stocks.rows,
            count: stocks.count
        };

    } catch(err) {
        throw err;
    }

}

module.exports.getAllStocks = getAllStocks;


/**
 * Get a single stock using the stock ID.
 * 
 * @param {Number} stock_id - Stock ID
 */
const getOneStock = async (stock_id) => {

    try {

        const stock = await Stocks.findOne({
            include: [{
                model: Inventory,
                as: 'item',
                attributes: [
                    'item_id',
                    'store_id',
                    'item_name',
                    'image_path'
                ]
            }],
            where: {
                stock_id
            }
        });

        return stock;

    } catch(err) {
        throw err;
    }

}

module.exports.getOneStock = getOneStock;


/**
 * Decrement Stocks after a user orders an item.
 * 
 * @param {Object} data
 * @param {Number} data.item_id - Item ID.
 * @param {Number} data.quantity - Quantity of Item.
 * @param {String} data.unit - Unit of Item quantity.
 * @param {Sequelize.Transaction} transaction - Transaction Object
 */
const decrementStock = async (data, transaction = null) => {

    try {

        required([
            'item_id',
            'quantity',
            'unit'
        ], data);

        const stocks = await Stocks.findAll({
            where: {
                item_id: data.item_id,
                remaining_quantity: {
                    [Sequelize.Op.gt]: 0
                }
            },
            order: [
                ['arrival_date', 'ASC']
            ]
        });

        const remaining = {
            quantity: data.quantity,
            unit: data.unit
        };

        // Abort process if no stocks are available.
        if(stocks.length === 0) {
            throw new Error('No Stocks');
        }

        // Loop through stocks
        for(let stock of stocks) {

            if( remaining.quantity <= 0 )
                break;

            // If remaining <= stock
            // remaining quantity is contained in a single stock
            if( Utils.compare({
                quantity: remaining.quantity,
                unit: remaining.unit
            },{
                quantity: stock.remaining_quantity,
                unit: stock.remaining_unit
            })){

                // Stock - Remaining
                let diff = Utils.subtractQuantity({
                    quantity1: stock.remaining_quantity,
                    unit1: stock.remaining_unit,
                    quantity2: remaining.quantity,
                    unit2: remaining.unit
                });

                await stock.set('remaining_quantity', parseFloat(diff.quantity).toFixed(3));
                await stock.set('remaining_unit', diff.unit);
                remaining.quantity = 0;

            } else {

                // Remaining - Stock
                let diff = Utils.subtractQuantity({
                    quantity1: remaining.quantity,
                    unit1: remaining.unit,
                    quantity2: stock.remaining_quantity,
                    unit2: stock.remaining_unit
                });

                remaining.quantity = parseFloat(diff.quantity).toFixed(3);
                remaining.unit = diff.unit;
                await stock.set('remaining_quantity', 0);
            }

            await stock.save({ transaction });

        }

        // committing the transaction to the database is done in calling method.

    } catch(err) {

        // If a transaction is started, Rollback
        if( transaction ){
            await transaction.rollback();
        }

        throw err;
    }

}

module.exports.decrementStock = decrementStock;


/**
 * Increment Stocks after a user cancels an order.
 * 
 * @param {Object} data
 * @param {Number} data.item_id - Item ID.
 * @param {Number} data.quantity - Quantity of Item.
 * @param {String} data.unit - Unit of Item quantity.
 * @param {Sequelize.Transaction} transaction - Transaction Object
 */
const incrementStock = async (data, transaction = null) => {

    try {

        required([
            'item_id',
            'quantity',
            'unit'
        ], data);

        // find all stocks where ( remaining_quantity < quantity )
        const stocks = await Stocks.findAll({
            where: {
                item_id: data.item_id,
                remaining_quantity: {
                    [Sequelize.Op.lt]: Sequelize.col('quantity')
                }
            },
            order: [
                ['arrival_date', 'DESC']
            ]
        });

        // Quantity to add to stocks.
        const remaining = {
            quantity: data.quantity,
            unit: data.unit
        };

        // Abort process if no stocks are available.
        if(stocks.length === 0) {
            throw new Error('No Stocks');
        }

        // Loop through stocks
        for(let stock of stocks) {

            if( remaining.quantity <= 0 )
                break;

            // space = Stock - Remaining Stock
            let space = Utils.subtractQuantity({
                quantity1: stock.quantity,
                unit1: stock.unit,
                quantity2: stock.remaining_quantity,
                unit2: stock.remaining_unit
            });

            // If remaining <= space
            // remaining quantity is contained in a single stock
            if( Utils.compare({
                quantity: remaining.quantity,
                unit: remaining.unit
            },{
                quantity: space.quantity,
                unit: space.unit
            })){

                // sum = Remaining Stock + Remaining
                let sum = Utils.addQuantity({
                    quantity1: stock.remaining_quantity,
                    unit1: stock.remaining_unit,
                    quantity2: remaining.quantity,
                    unit2: remaining.unit
                });

                // Remaining Stock = sum
                await stock.set('remaining_quantity', parseFloat(sum.quantity).toFixed(3));
                await stock.set('remaining_unit', sum.unit);
                remaining.quantity = 0;

            } else {

                // diff = remaining - space
                let diff = Utils.subtractQuantity({
                    quantity1: remaining.quantity,
                    unit1: remaining.unit,
                    quantity2: space.quantity,
                    unit2: space.unit
                });

                remaining.quantity = parseFloat(diff.quantity).toFixed(3);
                remaining.unit = diff.unit;
                await stock.set('remaining_quantity', stock.quantity);
                await stock.set('remaining_unit', stock.unit);
            }

            await stock.save({ transaction });

        }

        // committing the transaction to the database is done in calling method.

    } catch(err) {
        throw err;
    }

}

module.exports.incrementStock = incrementStock;


/**
 * Check if the item is in stock or not.
 * 
 * @param {Object} data 
 * @param {Number} data.item_id - Item ID.
 * @param {Number} data.quantity - Item Quantity.
 * @param {String} data.unit - Item Unit.
 */
const checkStock = async (data) => {

    try {

        // find the item ordered by the user.
        let item = await Inventory.findOne({
            where: {
                item_id: data.item_id
            },
            include: [{
                model: Stocks,
                as: 'stocks',
                where: {
                    remaining_quantity: {
                        [Sequelize.Op.gt]: 0
                    }
                },
                required: false
            }]
        });

        item = item.dataValues;

        let total_stock;
        // If stocks are available
        if( item.stocks.length ) {
            item.stocks = item.stocks.map((stock) => stock.dataValues);

            // Calculate total stocks.
            total_stock = item.stocks.reduce((total, current) => {

                total = Utils.addQuantity({
                    quantity1: total.quantity,
                    unit1: total.unit,
                    quantity2: current.remaining_quantity,
                    unit2: current.remaining_unit,
                });

                return total;
            },{ quantity: 0, unit: item.unit });

            item.total_stock = Object.assign({}, total_stock);

        } else {
            item.total_stock = {
                quantity: 0,
                unit: item.unit,
            };
        }


        if (Utils.compare({ quantity: data.quantity, unit: data.unit }, item.total_stock)) {
            // Provided quantity is less than total_stock
            return true;
        } else {
            // Provided quantity is greater than total_stock
            return false;
        }

    } catch(err) {
        throw err;
    }

}

module.exports.checkStock = checkStock;
