const Stocks = require('../helpers/stocks');


/**
 * Add new stocks of items.
 * 
 * @param {Object} req.body - Details of the new stock.
 * @param {Number} req.body.item_id - Item ID of the product
 * @param {Number} req.body.quantity - Total quantity of the item in the batch.
 * @param {String} req.body.unit - Unit of the item quantity.
 * @param {Number} req.body.cost - Total cost of the whole item batch.
 * @param {String} req.body.arrival_date - (YYYY-MM-DD) Date of arrival of stock.
 */
const addStocks = async (data, req, res, next) => {

    try {
        
        await Stocks.addStocks(req.body);

        res.json({
            status: 'success',
            message: 'New stocks added.'
        });

    } catch(err) {
        next(err)
    }

}

module.exports.addStocks = addStocks;


/**
 * Edit an existing stock details.
 * 
 * @param {Number} req.param.stock_id - Stock ID
 */
const editStocks = async (data, req, res, next) => {

    try {

        const userdata =  req.body;

        await Stocks.editStocks(userdata);

        res.json({
            status: 'success'
        });

    } catch(err) {
        next(err)
    }

}

module.exports.editStocks = editStocks;


/**
 * Delete Stock from database.
 * 
 * @param req.params.stock_id - Stock ID
 */
const deleteStocks = async (data, req, res, next) => {

    try {

        const { stock_id } = req.params;

        await Stocks.deleteStocks(stock_id);

        res.json({
            status: 'success',
            message: 'stock deleted'
        })
    } catch(err) {
        next(err)
    }

}

module.exports.deleteStocks = deleteStocks;



/**
 * Delete Stock from database.
 * 
 * @param req.params.stock_id - Stock ID
 */
const expireStocks = async (data, req, res, next) => {

    try {

        const { stock_id } = req.params;

        await Stocks.expireStocks(stock_id);

        res.json({
            status: 'success',
            message: 'stock expired'
        })
    } catch(err) {
        next(err)
    }

}

module.exports.expireStocks = expireStocks;


/**
 * Get list of all stocks.
 */
const getAllStocks = async (data, req, res, next) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 20;

        const offset = ( page - 1 ) * per_page;

        const stocks = await Stocks.getAllStocks(offset, per_page);

        Object.assign(stocks, {
            total_pages: Math.ceil(stocks.count/per_page),
        });
        
        res.json({
            status: 'success',
            data: stocks
        });

    } catch(err) {
        next(err);
    }

}

module.exports.getAllStocks = getAllStocks;


/**
 * Get a single stock using the stock ID.
 */
const getOneStock = async (data, req, res, next) => {

    try {

        const stock_id = req.params.stock_id;

        const stock = await Stocks.getOneStock(stock_id);
        
        res.json({
            status: 'success',
            data: {
                stock
            }
        });

    } catch(err) {
        next(err);
    }

}

module.exports.getOneStock = getOneStock;
