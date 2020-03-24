const _ = require('lodash');

const Stores = require('../models').stores;
const StoreOwners = require('../models').store_owners;
const ownerDetails = require('../models').owner_details;
const Users = require('../models').users;
const Orders = require('../models').orders;
const OrderDetails = require('../models').order_details;
const Inventory = require('../models').inventory;
const Sequelize = require('../models').Sequelize;

const Utils = require('./utils');


/**
 * Add store details to the database.
 *  
 * @param {Object} data - Store data
 */
const addStoreDetails = (data) => {

    // Convert address to a single object.
    data.address = Utils.formatAddress(data);


    return Stores.create(data).catch((err) => {
        throw err;
    });
}

module.exports.addStoreDetails = addStoreDetails;


/**
 * Adds a new user in user table as owner, and add details
 * to ownerDetails table.
 * 
 * @param {Object} data - User details.
 * 
 * @returns {Number} - Returns user_id of the owner.
 */
const addOwner = async (data) => {

    // Extract phone and email from data
    const user = _.pick(data,[
        'email',
        'phone'
    ]);

    // Throw an error if both email and phone are not given.
    if(!user.email && !user.phone){
        return new Error('Email or Password Required');
    }

    // Add a stock  password.
    // Let the user change it later.
    user.password = 'password';
    
    // Add user role, and usergroup for owner
    user.roles = ['owner'];
    user.usergroup = 'store';
    try {

        // Create a user for owner, and use the user_id to
        // create owner_details.
        const { user_id } = await Users.create(user);

        // combine address to a single json.
        data.address = Utils.formatAddress(data);

        // filter data and select relevant fields.
        const userDetails = _.pick(data,[
            'first_name',
            'last_name',
            'address',
            'aadhar_no',
        ]);

        userDetails.owner_id = user_id;

        // create a row in owner_details.
        await ownerDetails.create(userDetails);
        
        return user_id;
    } catch(err) {
        return err;
    }
}

module.exports.addOwner = addOwner;


/**
 * Associate a store to an owner, by adding an entry
 * in store_owners table.
 * 
 * @param {Number} storeId - Store ID
 * @param {Number} ownerId - User ID of owner
 */
const addStoreOwner = (storeId, ownerId) => {
    return StoreOwners.create({
        store_id: storeId,
        store_owner_id: ownerId
    }).catch((err) => {
        throw err;
    });;
}

module.exports.addStoreOwner = addStoreOwner;


/**
 * Edit the details of a store.
 * This method can be used to edit any or all of
 * the fields specified in the fields option.
 * 
 * @param {Object} data - Store Data
 */
const editStoreDetails = (data) => {
    
    data.address = Utils.formatAddress(data);

    return Stores.update(data, {
        fields: [
            'address',
            'name',
            'phone',
            'gst',
            'email',
            'rating',
            'opening_time',
            'closing_time',
            'status'
        ],
        where: {
            store_id: data.store_id
        }
    }).catch((err) => {
        throw err;
    });
}

module.exports.editStoreDetails = editStoreDetails;


/**
 * Edit the owner details/profile.
 * 
 * @param {Object} data - Owner details to be editted.
 */
const editOwner = async (data) => {

    // To change address, complete data
    // need to be provided.
    if(data.address1){
        data.address = Utils.formatAddress(data);
    }

    // Extract email and phone from data.
    const user = _.pick(data,[
        'email',
        'phone'
    ]);

    const owner = _.pick(data,[
        'first_name',
        'last_name',
        'address',
        'aadhaar_no'
    ]);

    try {
        // update phone and email in users table.
        await Users.update(user, {
            fields: [
                'email',
                'phone'
            ],
            where: {
                user_id: data.owner_id
            }
        });

        await ownerDetails.update(owner,{
            fields: [
                'first_name',
                'last_name',
                'address',
                'aadhaar_no'
            ],
            where: {
                owner_id: data.owner_id
            }
        });
    } catch(err) {
        return err;
    }
    
}

module.exports.editOwner = editOwner;


/**
 * Get details of store using store ID.
 * 
 * @param {Number} storeid - Store ID
 */
const getStoreDetails = (storeid) => {

    return Stores.findOne({
        where: {
            store_id: storeid,
        },
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt',
                'deletedAt'
            ]
        },
        include: [{
            model: Users,
            as: 'owner',
            attributes: [
                'user_id',
                'email',
                'phone',
            ],
            // include Profile
            include: [{
                model: ownerDetails,
                as: 'owner_profile',
                attributes: {
                    exclude: [
                        'owner_id',
                        'verification_code',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            }]
        }]
    });

}

module.exports.getStoreDetails = getStoreDetails;


/**
 * Get details of an owner using owner ID.
 * 
 * @param {Number} owner_id - Owner ID
 */
const getOwnerDetails = (ownerid) => {

    return Users.findOne({
        where: {
            user_id: ownerid,
        },
        attributes: [
            'user_id',
            'email',
            'phone'
        ],
        include: [{
            // Store
            model: Stores,
            as: 'store',
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'deletedAt'
                ]
            },
        },{
            // Owner Profile
            model: ownerDetails,
            as: 'owner_profile',
            attributes: {
                exclude: [
                    'owner_id',
                    'verification_code',
                    'createdAt',
                    'updatedAt'
                ]
            }
        }]
    });

}

module.exports.getOwnerDetails = getOwnerDetails;


/**
 * Get details of all stores.
 */
const getStoreList = (offset = 0, limit = 10) => {
    return Stores.findAll({
        offset, limit
    });
}

module.exports.getStoreList = getStoreList;


/**
 * Get stats for displaying in the dashboard.
 * 
 * @param {Number} store_id - Store ID
 */
const dashBoard = async (store_id) => {

    try {

        if( !store_id ){
            throw new Error('Store ID required.');
        }

        const where = {
            store_id
        };

        const total_orders = await Orders.count({ where });

        const total_users = await Users.count();


        const most_sold_items = await OrderDetails.findAll({
            // SELECT item_id, count('item_id) AS 'occurance'
            attributes: [
                'item_id',
                [Sequelize.fn('COUNT', Sequelize.col('order_details.item_id')), 'occurance']
            ],
            // GROUP BY 'item_id'
            group: [ 'order_details.item_id' ],
            // ORDER BY 'occurance' DESC
            order: [
                [Sequelize.col('occurance'), 'DESC']
            ],
            limit: 10,
            include: [{
                model: Inventory,
                as: 'item_details'
            }]
        });

        return {
            total_orders,
            total_users,
            most_sold_items
        }

    } catch(err) {
        throw err;
    }

} 

module.exports.dashBoard = dashBoard;

