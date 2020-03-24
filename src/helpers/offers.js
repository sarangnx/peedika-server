const _ = require('lodash');

const Offers = require('../models').offers;
const OfferItems = require('../models').offer_items;
const Inventory = require('../models').inventory;
const sequelize = require('../models').sequelize;
const Sequelize = require('../models').Sequelize;

/**
 * Add a new offer. 
 * @param {Object} data - Offer Data
 * @param {String} data.offer_name - Offer Name.
 * @param {String} data.offer_description - Long Description about the offer.
 * @param {Boolean} data.offer_status - Status of offer (active or not).
 * @param {Number} data.discount_percentage - Discount percentage of the offer.
 * @param {Array} data.items - Array of Item IDs.
 */
const addOffer = async (data) => {

    let transaction = await sequelize.transaction();

    try {

        const offerData = _.pick(data, [
            'offer_name',
            'offer_description',
            'offer_status',
            'discount_percentage'
        ]);

        const { offer_id } = await Offers.create(offerData, { transaction });

        let items = await Inventory.findAll({
            where: {
                item_id: {
                    [Sequelize.Op.or]: data.items
                }
            },
            attributes: [
                'item_id',
                'market_price'
            ]
        });

        // declare variables outside loop
        let discount;
        // calculate offer price of each item and save.
        for (let item of items) {

            discount = calculateOfferPrice(item.market_price, offerData.discount_percentage);
            await item.set('offer_price', discount);
            await item.save({ transaction });
            await OfferItems.create({
                offer_id: offer_id,
                item_id: item.item_id
            },{ transaction });

        }

        await transaction.commit();

    } catch(err){

        // If a transaction is started, Rollback
        if( transaction ){
            await transaction.rollback();
        }

        throw err;
    }

}

module.exports.addOffer = addOffer;


/**
 * View Offers added to the database.
 * 
 * @param {Object} options - Options for selection.
 * @param {Number} options.offset - The row from which find is to be started.
 * @param {Number} options.limit - Number of rows to be returned.
 * @param {Boolean} options.offer_status - Offer status can be true, false or null.
 * Where null implies no filter using offer_status.
 */
const viewOffers = async (options) => {

    try {

        const where = {};
        if( options.offer_status !== null && options.offer_status !== undefined ){
            where.offer_status = options.offer_status
        }

        // find count seperately because of usage of include.
        const count = await Offers.count({
            where: {
                ...where
            },
        });

        // find the offers from database
        const offers = await Offers.findAll({
            where: {
                ...where
            },
            include: [{
                model: Inventory,
                as: 'items',
                through: { attributes: [] }, // don't show junction table
                attributes: [
                    'item_id',
                    'item_name',
                    'image_path',
                    'market_price',
                    'offer_price',
                    'quantity',
                    'unit'
                ]
            }],
            offset: options.offset,
            limit: options.limit,
            order: [
                ['updatedAt', 'DESC']
            ]
        });

        return {
            offers: offers,
            count: count
        };

    } catch(err) {
        throw err;
    }

}

module.exports.viewOffers = viewOffers;


const editOffer = async () => {

    try {

    } catch(err) {
        throw err;
    }

}

module.exports.editOffer = editOffer;


/**
 * Delete an offer details permanently.
 * 
 * @param {Number} offer_id - Offer ID
 */
const deleteOffer = async (offer_id) => {

    let transaction = await sequelize.transaction();

    try {

        if(!offer_id){
            throw new Error('No Offer ID Specified');
        }

        // Deactivate offer first
        await deactivateOffer(offer_id);

        // Delete entries from junction table
        await OfferItems.destroy({
            where: {
                offer_id
            }
        },{ transaction });

        // Delete entry from offers table
        await Offers.destroy({
            where: {
                offer_id
            }
        },{ transaction });
        
        await transaction.commit();

    } catch(err) {

        // If a transaction is started, Rollback
        if( transaction ){
            await transaction.rollback();
        }

        throw err;
    }

}

module.exports.deleteOffer = deleteOffer;


/**
 * Deactivate an Offer.
 * This method does not delete any data.
 * Set offer_status = false.
 * Reset all item offer_price back to market_price
 * 
 * @param {Number} offer_id - Offer ID
 */
const deactivateOffer = async (offer_id) => {

    let transaction = await sequelize.transaction();

    try {

        if(!offer_id){
            throw new Error('No Offer ID Specified');
        }

        const offer = await Offers.findOne({
            where: {
                offer_id
            },
            include: [{
                model: Inventory,
                as: 'items',
                attributes: ['item_id'],
                through: { attributes: [] }, // don't show junction table
            }]
        });

        // Deactivate offer
        await offer.set('offer_status', false);
        await offer.save({ transaction });

        // get Item IDs
        const item_ids = offer.items.map((item) => ( item.item_id ));

        let items = await Inventory.findAll({
            where: {
                item_id: {
                    [Sequelize.Op.or]: item_ids
                }
            },
            attributes: [
                'item_id',
                'offer_price',
                'market_price'
            ]
        });

        let market_price;
        // reset prices
        for (let item of items) {

            market_price = item.market_price;
            await item.set('offer_price', market_price);
            await item.save({ transaction });

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

module.exports.deactivateOffer = deactivateOffer;


const activateOffer = async () => {

    try {

    } catch(err) {
        throw err;
    }

}

module.exports.activateOffer = activateOffer;


/**
 * Calculate the offer price of an item.
 * @param {Number} market_price - Market Price of the item.
 * @param {Number} discount_percentage - Discount Percentage.
 * @returns {Number} Offer price calculated.
 */
const calculateOfferPrice = (market_price, discount_percentage) => {
    
    market_price = parseFloat(market_price);
    discount_percentage = parseFloat(discount_percentage);

    let discount = ( market_price * discount_percentage ) / 100;

    return (market_price - discount).toFixed(2);

}


/**
 * Get suggestions based on offer names.
 * 
 * @param {String} search - String to be searched.
 */
const suggestOffer = async (search) => {

    try {

        // Match offer_name in Offers.
        const offers = await Offers.findAndCountAll({
            where: {
                offer_name: {
                    [Sequelize.Op.substring]: search
                }
            },
            order: [
                ['offer_status', 'DESC'] // show true values first
            ],
            attributes: {
                exclude: [
                    'offer_description',
                    'createdAt',
                    'updatedAt'
                ]
            }
        });

        return {
            offers: offers.rows,
            count: offers.count
        };

    } catch(err) {
        throw err;
    }
}

module.exports.suggestOffer = suggestOffer;
