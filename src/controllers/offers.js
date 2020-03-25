const Offers = require('../helpers/offers');


/**
 * Add a new offer.
 * @param {Object} req.body - User formdata.
 * @param {String} req.body.offer_name - Offer Name.
 * @param {String} req.body.offer_description - Long Description about the offer.
 * @param {Boolean} req.body.offer_status - Status of offer (active or not).
 * @param {Number} req.body.discount_percentage - Discount percentage of the offer.
 * @param {Array} req.body.items - Array of Item IDs.
 */
const addOffer = async (data, req, res, next) => {
    try {
        const userdata = req.body;

        await Offers.addOffer(userdata);

        res.json({
            status: 'success'
        });
    } catch(err) {
        next(err);
    }
}

module.exports.addOffer = addOffer;


/**
 * View Offers.
 */
const viewOffers = async (data, req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 100;

        const offset = ( page - 1 ) * per_page;

        const options = {
            offset,
            limit: per_page
        };

        req.query.status === 'active' ? options.offer_status = true :
        req.query.status === 'inactive' ? options.offer_status = false:
        null;
        
        const offers = await Offers.viewOffers(options);

        Object.assign(offers, {
            total_pages: Math.ceil(offers.count/per_page)
        });

        res.json({
            status: 'success',
            data: offers
        });
    } catch(err) {
        next(err);
    }
}

module.exports.viewOffers = viewOffers;


const editOffer = async (data, req, res, next) => {
    try {
        // TODO
        res.end();
    } catch(err) {
        next(err);
    }
}

module.exports.editOffer = editOffer;


/**
 * Delete details of an offer and revert offer prices of items.
 * 
 * @param {*} req.query.offer_id - Offer ID
 */
const deleteOffer = async (data, req, res, next) => {
    try {
        const offer_id = req.query.offer_id;

        await Offers.deleteOffer(offer_id);

        res.json({
            status: 'success'
        });
    } catch(err) {
        next(err);
    }
}

module.exports.deleteOffer = deleteOffer;


/**
 * Deactivate an Offer.
 * 
 * @param {*} req.query.offer_id - Offer ID
 */
const deactivateOffer = async (data, req, res, next) => {
    try {
        const offer_id = req.query.offer_id;

        await Offers.deactivateOffer(offer_id);

        res.json({
            status: 'success'
        });
    } catch(err) {
        next(err);
    }
}

module.exports.deactivateOffer = deactivateOffer;


const activateOffer = async (data, req, res, next) => {
    try {
        // TODO
        res.end();
    } catch(err) {
        next(err);
    }
}

module.exports.activateOffer = activateOffer;


/**
 * Get suggestions of offers by names ordered by offer_status
 * 
 * @param {String} req.query.search - search query
 */
const suggestOffers = async (req, res, next) => {
    try {
        const search = req.query.search;

        const result = await Offers.suggestOffer(search);

        res.json({
            status: 'success',
            data: result
        });
    } catch(err) {
        next(err);
    }
}

module.exports.suggestOffers = suggestOffers;
