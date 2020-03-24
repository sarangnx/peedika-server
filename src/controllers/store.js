const Store = require('../helpers/store');

/**
 * Create new store.
 * Requires store owner id.
 */
const createNewStore = async (data, req, res, next) => {

    // Get ownerID from form-data.
    const owner_id = req.body.owner_id;

    try {
        // Add details to stores table.
        const { store_id } = await Store.addStoreDetails(req.body);
        
        // Add an entry to store_owner junction table.
        await Store.addStoreOwner(store_id, owner_id);

        res.json({
            status: 'success',
            message: 'Store Created'
        });

    } catch(err) {
        next(err);
    }
}

module.exports.createNewStore = createNewStore;


/**
 * Create a new Owner user and profile.
 */
const createNewOwner = async (data, req, res, next) => {

    try {
        // Create an owner. Returns ID of owner.
        const owner_id = await Store.addOwner(req.body);

        // Throw an error if return value of addOwner
        // is an Error object.
        if( owner_id instanceof Error ){
            throw owner_id;
        }

        res.json({
            data: {
                owner_id
            }
        });
    } catch(err) {
        next(err);
    }
}

module.exports.createNewOwner = createNewOwner;


/**
 * Edit details of a store. store_id is passed as a
 * parameter.
 */
const editStore = async (data, req, res, next) => {
    
    try {
        const { store_id } = req.params;

        if( !store_id ){
            throw new Error('Store ID required');
        }

        const storeData = req.body;
        storeData.store_id = store_id;

        // Pass store_id and all data as a single object.
        await Store.editStoreDetails(storeData);

        res.json({
            status: 'success',
            message: 'Store details changed'
        });

    } catch(err) {
        next(err);
    }

}

module.exports.editStore = editStore;


/**
 * Edit owner details inlcuding phone and email.
 * Password cannot be changed in this function.
 */
const editOwner = async (data, req, res, next) => {

    try {
        const { owner_id } = req.params;
        
        const ownerData = req.body;
        ownerData.owner_id = owner_id;

        // Pass all data to editOwner.
        await Store.editOwner(ownerData);

        res.json({
            status: 'success',
            message: 'Owner details changed'
        });
    } catch(err) {
        next(err);
    }

}

module.exports.editOwner = editOwner;


/**
 * View Store Details.
 */
const viewStore = async (data, req, res, next) => {

    const { store_id } = req.params;

    try {

        // Get details of store.
        const store = await Store.getStoreDetails(store_id);

        // send the data to client
        res.json({
            status: 'success',
            data: store
        });

    } catch(err) {
        next(err);
    }

}

module.exports.viewStore = viewStore;


/**
 * View owner details.
 */
const viewOwner = async (data, req, res, next) => {

    const { owner_id } = req.params;

    try {

        const owner = await Store.getOwnerDetails(owner_id);

        res.json({
            status: 'success',
            data: owner
        });

    } catch(err) {
        next(err);
    }
}

module.exports.viewOwner = viewOwner;


/**
 * Get stats to display in the dashboard section
 */
const dashBoard = async (data, req, res, next) => {

    try {

        const store_id = req.query.store_id;

        const stats = await Store.dashBoard(store_id);

        res.json({
            status: 'success',
            data: stats
        });

    } catch(err) {
        next(err);
    }

}

module.exports.dashBoard = dashBoard;
