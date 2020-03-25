const _ = require('lodash');
const fs = require('fs').promises;
const path = require('path');

const sequelize = require('../models').sequelize;
const Sequelize = require('../models').Sequelize;
const Inventory = require('../models').inventory;
const Category = require('../models').category;
const Brands = require('../models').brands;
const CategoryItems = require('../models').category_items;
const Stocks = require('../models').stocks;
const Offers = require('../models').offers;
const Op = require('../models').Sequelize.Op;
const required = require('../helpers/utils').required;
const Utils = require('../helpers/utils');


/**
 * Add an item to inventory.
 * Each store is supposed to have seperate inventory.
 * So, store_id should also be passed along with item.
 *
 * @param {Object} item - Item details
 */
const addItem = async (item) => {

    // Filter out the object.
    const data = _.pick(item, [
        'item_name',
        'store_id',
        'attributes',
        'brand_id',
        'market_price',
        'offer_price',
        'image_path',
        'coupon_code',
        'category_id',
        'quantity',
        'unit'
    ]);

    required([
        'item_name',
        'store_id',
        'quantity',
        'unit'
    ], data);

    /***
     * set scope of transaction outside of try,
     * so transaction can be used in catch block.
     */
    let transaction;

    try {
        // Start a transaction.
        transaction = await sequelize.transaction();

        // Add item to inventory.
        const newItem = await Inventory.create(data,{ transaction });

        // Add category if given
        if( data.category_id ){
            await CategoryItems.create({
                item_id: newItem.item_id,
                category_id: data.category_id
            },{ transaction });
        }

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

module.exports.addItem = addItem;


/**
 * Edit an item in the inventory.
 * @param {Object} item - Item details
 *
 * @returns {null} Absolutely nothing other than some errors if any.
 */
const editItem = async (item) => {

    let transaction;

    try {

        // Start a transaction.
        transaction = await sequelize.transaction();

        const oldItem = await Inventory.findOne({
            where: {
                item_id: item.item_id
            }
        });

        // Get the name and the path of the item image.
        const filename = oldItem.image_path;

        // If image_path is not null, join path.
        let file;
        if( filename ){
            file = path.join(__dirname, '..', '..', 'images', 'inventory', filename);
        }

        // Update the instance.
        oldItem.update(item);

        // Delete the image if the path is changed to new one.
        if( file && oldItem.changed('image_path') ){
            try {
                // try deleting the file.
                await fs.unlink(file);

            } catch(err) {
                /***
                 * If the error code is not ENOENT,
                 * ie., if error is not 'file not found',
                 * return the error.
                 * There is nothing to do,
                 * if there is no file to be deleted.
                 */
                if( err.code !== 'ENOENT' ){
                    throw err;
                }
            }
        }


        // Delete category, subcategory and subsubcategory items.
        await CategoryItems.destroy({
            where: {
                item_id: item.item_id
            }
        },{ transaction });

        await SubCategoryItems.destroy({
            where: {
                item_id: item.item_id
            }
        },{ transaction });

        await SubSubCategoryItems.destroy({
            where: {
                item_id: item.item_id
            }
        },{ transaction });


        // change category id
        if( item.category_id ){
            await CategoryItems.create({
                item_id: item.item_id,
                category_id: item.category_id
            },{
                where: {
                    item_id: item.item_id
                }
            },{ transaction });
        }

        // change sub category id
        if( item.sub_category_id ){
            await SubCategoryItems.create({
                item_id: item.item_id,
                sub_category_id: item.sub_category_id
            },{
                where: {
                    item_id: item.item_id
                }
            },{ transaction });
        }

        // change sub sub category id
        if( item.sub_sub_category_id ){
            await SubSubCategoryItems.create({
                item_id: item.item_id,
                sub_sub_category_id: item.sub_sub_category_id
            },{
                where: {
                    item_id: item.item_id
                }
            },{ transaction });
        }

        await transaction.commit();

        // finally save the updated data to the database.
        await oldItem.save();

    } catch(err) {

        // If a transaction is started, Rollback
        if( transaction ){
            await transaction.rollback();
        }

        throw err;
    }

}

module.exports.editItem = editItem;


/**
 * Edit Image of the item.
 */
const editImage = async ({ item_id, image_path }) => {

    try {

        const oldItem = await Inventory.findOne({
            where: {
                item_id
            }
        });

        // Get the name and the path of the old item image.
        const filename = oldItem.image_path;

        // If image_path is not null, join path.
        let file;
        if( filename ){
            file = path.join(__dirname, '..', '..', 'images', 'inventory', filename);
        }

        // Update the instance.
        oldItem.update({
            image_path
        });

        // Delete the image if the path is changed to new one.
        if( file && oldItem.changed('image_path') ){

            try {
                // try deleting the file.
                await fs.unlink(file);

            } catch(err) {
                /***
                 * If the error code is not ENOENT,
                 * ie., if error is not 'file not found',
                 * return the error.
                 * There is nothing to do,
                 * if there is no file to be deleted.
                 */
                if( err.code !== 'ENOENT' ){
                    throw err;
                }
            }

        }

        // finally save the updated data to the database.
        await oldItem.save();
    } catch(err) {
        throw err;
    }

}

module.exports.editImage = editImage;


/**
 * Delete an item from the database and
 * remove its image from the filesystem.
 *
 * @param {Number} item_id - Id of item to be deleted.
 */
const deleteItem = async (item_id) => {
    try {
        // find the item
        const item = await Inventory.findOne({
            where: {
                item_id
            }
        });

        if( !item ){
            throw new Error('Cannot find the item to delete.');
        }

        // Get the name and the path of the item image.
        const filename = item.image_path;

        // If image_path is not null, join path.
        let file;
        if( filename ){
            file = path.join(__dirname, '..', '..', 'images', 'inventory', filename);
        }


        // if file is not null, try deleting the file.
        if( file ){
            try {
                await fs.unlink(file);
            } catch(err) {
                /***
                * If the error code is not ENOENT,
                * ie., if error is not 'file not found',
                * return the error.
                * There is nothing to do,
                * if there is no file to be deleted.
                */
                if( err.code !== 'ENOENT' ){
                    throw err;
                }
            }
        }


        // Delete the entries in the junction table.
        await CategoryItems.destroy({
            where: {
                item_id: item.item_id
            }
        });

        await SubCategoryItems.destroy({
            where: {
                item_id: item.item_id
            }
        });

        await SubSubCategoryItems.destroy({
            where: {
                item_id: item.item_id
            }
        });

        // delete the database row.
        try {
            // try deleting permanently.
            await item.destroy({ force: true });
        } catch(err) {
            // if not, set deletedAt flag.
            await item.destroy();
        }

    } catch(err) {
        throw err;
    }
}

module.exports.deleteItem = deleteItem;


/**
 * Get details of an individual item by its ID.
 *
 * @param {Number} item_id - Item ID
 */
const getItemById = async (item_id) => {
    try {
        // Find item by ID
        let item = await Inventory.findOne({
            where: {
                item_id
            },
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'deletedAt'
                ]
            },
            include: [{
                model: Category,
                as: 'category',
                through: { attributes: [] } // don't show junction table
            },{
                model: Brands,
                as: 'brand'
            }],
        });

        return item;
    } catch(err) {
        throw err;
    }
}

module.exports.getItemById = getItemById;


/**
 * Get the list of all categories and their IDs.
 */
const getCategories = async () => {

    try {
        // Get categories
        const categories = await Category.findAll();

        return categories;

    } catch(err) {
        throw err;
    }
}

module.exports.getCategories = getCategories;


/**
 * Get the list of all categories and their IDs.
 */
const getSubCategories = async (category_id) => {

    try {
        // Get categories
        let sub_categories = await SubCategory.findAll({
            where: {
                parent_category_id: category_id
            },
            include: [{
                model: SubSubCategory,
                as: 'sub_sub_category'
            }]
        });

        // Set count of sub sub category.
        sub_categories = sub_categories.map((item) => {
            item = item.dataValues
            item.sub_sub_category = item.sub_sub_category.length;
            return item;
        });

        return sub_categories;

    } catch(err) {
        throw err;
    }
}

module.exports.getSubCategories = getSubCategories;


/**
 * Get sub sub category
 *
 * @param {Number} sub_category_id - Sub Category.
 */
const getSubSubCategories = async (sub_category_id) => {

    try {
        // Get categories
        const sub_sub_categories = await SubSubCategory.findAll({
            where: {
                sub_category_id: sub_category_id
            },
        });

        return sub_sub_categories;

    } catch(err) {
        throw err;
    }
}

module.exports.getSubSubCategories = getSubSubCategories;


/**
 * get all categories, sub categories and sub sub categories.
 */
const getAllCategories = async () => {

    try {

        const categories = await Category.findAll({
            include: [{
                model: SubCategory,
                as: 'sub_category',
                include: [{
                    model: SubSubCategory,
                    as: 'sub_sub_category'
                }]
            }]
        });

        return categories;

    } catch(err) {
        throw err;
    }

}

module.exports.getAllCategories = getAllCategories;


/**
 * Get list of all brands and their IDs.
 */
const getBrands = async () => {

    try {
        // Get brands
        const brands = await Brands.findAll();

        return brands;

    } catch(err) {
        throw err;
    }
}

module.exports.getBrands = getBrands;


/**
 * Search for a string in the inventory table.
 *  - match item_name in inventory table.
 *  - match category_name in category table.
 *  - match sub_category_name in sub category table.
 *  - match brand_name in brands table.
 *
 * #TODO: Rewrite the queries with outer join.
 *
 * @param {Object} options - Search Options
 * @param {String} options.search - Search query string.
 * @param {Number} options.offset - The row from which find is to be started.
 * @param {Number} options.limit - Number of rows to be returned.
 */
const searchItems = async ({ search, offset, limit }) => {
    try {

        // Match item_name in Inventory.
        const items = await Inventory.findAll({
            offset,
            limit,
            where: {
                item_name: {
                    [Op.substring]: search
                }
            },
            include: [{
                model: Stocks,
                as: 'stocks',
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt',
                        'deletedAt'
                    ]
                },
                required: false
            }]
        });

        const count = await Inventory.count({
            offset,
            limit,
            where: {
                item_name: {
                    [Op.substring]: search
                }
            },
        });

        // Extract datavalues to a seperate variable,
        // because we cannot add extra info directly.
        let rows = items.map((row) => row.dataValues);

        // Set discount price and percentage
        rows = rows.map((item) => {

            // assign discount if offer_price exists and is not equal to market_price
            if( item.offer_price && item.market_price !== item.offer_price ){

                item.discount = item.market_price - item.offer_price;
                item.discount_percentage = (( item.discount / item.market_price ) * 100).toFixed(2);

            }

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

                // send availability status
                if( parseFloat(total_stock.quantity) ){
                    item.total_stock = Object.assign({}, total_stock, {
                        available: true,
                        message: 'Available'
                    });
                } else {
                    item.total_stock = Object.assign({}, total_stock, {
                        available: false,
                        message: 'Out of Stock'
                    });
                }

                // convert to all units. except count.
                let converted = Utils.convertToAll(item.total_stock.quantity, item.total_stock.unit);
                item.total_stock.converted = converted;

            } else {
                item.total_stock = {
                    quantity: 0,
                    unit: item.unit,
                    available: false,
                    message: 'Out of Stock'
                };
            }

            // remove stocks array.
            delete item.stocks;
            return item;

        });

        return {
            items: rows,
            total: count
        };

    } catch(err) {
        throw err;
    }
}

module.exports.searchItems = searchItems;


/**
 * Get items by category, sub category or sub sub category.
 *
 * @param {Object} data - IDs of caategory.
 * @param {Number} data.category_id - Level 1 Category ID.
 * @param {Number} data.sub_category_id - Level 2 Category ID.
 * @param {Number} data.sub_sub_category_id - Level 3 Category ID.
 * @param {Number} data.offset - The row from which find is to be started.
 * @param {Number} data.limit - Number of rows to be returned.
 * @param {Boolean} data.stock - true or false, true returns only outofstock products.
 */
const getItemsByCategory = async ({ category_id, sub_category_id, sub_sub_category_id, offset, limit, stock }) => {

    try {

        /***
         * If category ID is passed, prepare a where clause,
         * with category_id.
         * Pass it to include using Object spread.
         */
        const category_filter = category_id ? {
            where: {
                category_id
            },
            required: true
        } :  { };

        /***
         * If sub category ID is passed, prepare a where clause,
         * with sub_category_id.
         * Pass it to include using Object spread.
         */
        const sub_category_filter = sub_category_id ? {
            where: {
                sub_category_id
            },
            required: true
        } :  { };

        /***
         * If sub sub category ID is passed, prepare a where clause,
         * with sub_category_id. (not sub_sub, because self reference).
         * Pass it to include using Object spread.
         */
        const sub_sub_category_filter = sub_sub_category_id ? {
            where: {
                sub_sub_category_id
            },
            required: true
        } :  { };

        // If stock == true, forget about offset and limit,
        // its a nightmare to implement that since total_stock is,
        // calculated after items are fetched from database.
        // using aggregate function with include is a nightmare.
        if( stock ) {
            limit = null;
            offset = 0;
        }

        // Fetch item from the database.
        const items = await Inventory.findAll({
            // Level 1: Category
            include: [{
                model: Category,
                as: 'category',
                ...category_filter,
                through: { attributes: [] }, // don't show junction table
                attributes: [], // exclude attributes from include
            },{
                model: SubCategory,
                as: 'sub_category',
                ...sub_category_filter,
                through: { attributes: [] }, // don't show junction table
                attributes: [], // exclude attributes from include
            },{
                model: SubSubCategory,
                as: 'sub_sub_category',
                ...sub_sub_category_filter,
                through: { attributes: [] }, // don't show junction table
                attributes: [], // exclude attributes from include
            },{
                model: Stocks,
                as: 'stocks'
            }],

            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'deletedAt'
                ]
            },
            offset,
            limit
        });

        // find count seperately
        let count = await Inventory.count({
            include: [{
                model: Category,
                as: 'category',
                ...category_filter,
                through: { attributes: [] }, // don't show junction table
                attributes: [], // exclude attributes from include
            },{
                model: SubCategory,
                as: 'sub_category',
                ...sub_category_filter,
                through: { attributes: [] }, // don't show junction table
                attributes: [], // exclude attributes from include
            },{
                model: SubSubCategory,
                as: 'sub_sub_category',
                ...sub_sub_category_filter,
                through: { attributes: [] }, // don't show junction table
                attributes: [], // exclude attributes from include
            }],
        });


        // Extract datavalues to a seperate variable,
        // because we cannot add extra info directly.
        let rows = items.map((row) => row.dataValues);

        // Set discount price and percentage
        rows = rows.map((item) => {

            // assign discount if offer_price exists and is not equal to market_price
            if( item.offer_price && item.market_price !== item.offer_price ){

                item.discount = item.market_price - item.offer_price;
                item.discount_percentage = (( item.discount / item.market_price ) * 100).toFixed(2);

            }

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

                // send availability status
                if( parseFloat(total_stock.quantity) ){
                    item.total_stock = Object.assign({}, total_stock, {
                        available: true,
                        message: 'Available'
                    });
                } else {
                    item.total_stock = Object.assign({}, total_stock, {
                        available: false,
                        message: 'Out of Stock'
                    });
                }

                // convert to all units. except count.
                let converted = Utils.convertToAll(item.total_stock.quantity, item.total_stock.unit);
                item.total_stock.converted = converted;

            } else {
                item.total_stock = {
                    quantity: 0,
                    unit: item.unit,
                    available: false,
                    message: 'Out of Stock'
                };
            }

            // remove stocks array.
            delete item.stocks;

            // return items with stock availability = false
            // if stock == true
            if( stock && item.total_stock.available === false ) {
                return item;
            } else if ( stock ) {
                // else if stock == true and stock availability = true
                // don't return the item.
                return;
            } else {
                return item;
            }

        });

        rows = _.remove(rows, _.identity);

        if( stock ) {
            count = rows.length;
        }

        return {
            items: rows,
            total: count
        };

    } catch(err) {
        throw err;
    }
}

module.exports.getItemsByCategory = getItemsByCategory;


/**
 * Get details of all items in the inventory.
 *
 * @param {Object} data - Pagination data.
 * @param {Number} data.offset - The row from which find is to be started.
 * @param {Number} data.limit - Number of rows to be returned.
 * @param {Boolean} data.stock - true or false, true returns only outofstock products.
 */
const getAllItems = async ({ offset, limit, random, stock }) => {
    try {

        const order = random ? {
            order: [
                [Sequelize.literal('RAND()')]
            ]
        } : {};

        if( stock ) {
            limit = null;
            offset = 0;
        }

        // Fetch items from the database.
        const items = await Inventory.findAll({
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'deletedAt'
                ]
            },
            include: [{
                model: Stocks,
                as: 'stocks',
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt',
                        'deletedAt'
                    ]
                },
            }],
            offset,
            limit,
            ...order
        });

        let count = await Inventory.count();

        // Extract datavalues to a seperate variable,
        // because we cannot add extra info directly.
        let rows = items.map((row) => row.dataValues);

        // Set discount price and percentage
        rows = rows.map((item) => {

            // assign discount if offer_price exists and is not equal to market_price
            if( item.offer_price && item.market_price !== item.offer_price ){

                item.discount = item.market_price - item.offer_price;
                item.discount_percentage = (( item.discount / item.market_price ) * 100).toFixed(2);

            }

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

                // send availability status
                if( parseFloat(total_stock.quantity) ){
                    item.total_stock = Object.assign({}, total_stock, {
                        available: true,
                        message: 'Available'
                    });
                } else {
                    item.total_stock = Object.assign({}, total_stock, {
                        available: false,
                        message: 'Out of Stock'
                    });
                }

                // convert to all units. except count.
                let converted = Utils.convertToAll(item.total_stock.quantity, item.total_stock.unit);
                item.total_stock.converted = converted;

            } else {
                item.total_stock = {
                    quantity: 0,
                    unit: item.unit,
                    available: false,
                    message: 'Out of Stock'
                };
            }

            // remove stocks array.
            delete item.stocks;

            // return items with stock availability = false
            // if stock == true
            if( stock && item.total_stock.available === false ) {
                return item;
            } else if ( stock ) {
                // else if stock == true and stock availability = true
                // don't return the item.
                return;
            } else {
                return item;
            }

        });

        rows = _.remove(rows, _.identity);

        if( stock ) {
            count = rows.length;
        }

        return {
            items: rows,
            total: count
        };

    } catch(err) {
        throw err;
    }

}

module.exports.getAllItems = getAllItems;


/**
 * Get item suggestions.
 *
 * @param {String} search - Search query string.
 */
const suggestItems = async (search) => {
    try {

        // Match item_name in Inventory.
        const items = await Inventory.findAndCountAll({
            where: {
                item_name: {
                    [Op.substring]: search
                }
            },
            attributes: [
                'item_id',
                'item_name',
                'image_path',
                'market_price',
                'offer_price',
                'unit'
            ]
        });

        return {
            items: items.rows,
            count: items.count
        };

    } catch(err) {
        throw err;
    }
}

module.exports.suggestItems = suggestItems;


const getItemsByOfferID = async ({ offer_id, offset, limit }) => {

    try {

        const items = await Inventory.findAll({
            offset,
            limit,
            include: [{
                model: Offers,
                as: 'offer',
                where: {
                    offer_id
                }
            },{
                model: Stocks,
                as: 'stocks',
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt',
                        'deletedAt'
                    ]
                },
                required: false
            }],
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'deletedAt'
                ]
            }
        });


        // get count of items with offer offer_id.
        const count = await Inventory.count({
            include: [{
                model: Offers,
                as: 'offer',
                where: {
                    offer_id
                }
            }]
        });

        // Extract datavalues to a seperate variable,
        // because we cannot add extra info directly.
        let rows = items.map((row) => row.dataValues);

        // Set discount price and percentage
        rows = rows.map((item) => {

            // assign discount if offer_price exists and is not equal to market_price
            if( item.offer_price && item.market_price !== item.offer_price ){

                item.discount = item.market_price - item.offer_price;
                item.discount_percentage = (( item.discount / item.market_price ) * 100).toFixed(2);

            }

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

                // send availability status
                if( parseFloat(total_stock.quantity) ){
                    item.total_stock = Object.assign({}, total_stock, {
                        available: true,
                        message: 'Available'
                    });
                } else {
                    item.total_stock = Object.assign({}, total_stock, {
                        available: false,
                        message: 'Out of Stock'
                    });
                }

                // convert to all units. except count.
                let converted = Utils.convertToAll(item.total_stock.quantity, item.total_stock.unit);
                item.total_stock.converted = converted;

            } else {
                item.total_stock = {
                    quantity: 0,
                    unit: item.unit,
                    available: false,
                    message: 'Out of Stock'
                };
            }

            // remove stocks array.
            delete item.stocks;
            return item;

        });

        return {
            items: rows,
            count: count
        };


    } catch(err) {
        throw err;
    }

}

module.exports.getItemsByOfferID = getItemsByOfferID;
