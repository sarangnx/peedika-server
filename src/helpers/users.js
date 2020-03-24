const Users = require('../models').users;
const Utils = require('./utils');


/**
 * Get the profile details of a user.
 * 
 * @param {Number} user_id - User ID
 */
const getUserProfile = async (user_id) => {
    try {
        const user = await Users.findOne({
            where: {
                user_id
            },
            attributes: {
                exclude: [
                    'password',
                    'createdAt',
                    'updatedAt',
                    'deletedAt',
                ]
            }
        });
        return user;
    } catch(err) {
        throw err;
    }
}

module.exports.getUserProfile = getUserProfile;


/**
 * Update user profile data.
 * 
 * @param {Object} data - User profile details.
 * @param {Number} data.user_id - User ID
 * @param {Number} data.name - User Name
 * @param {String} data.house - House Name or Number
 * @param {Number} data.ward - Ward Number
 * @param {String} data.area - Area or locality
 * @param {String} data.district - District
 * @param {String} data.pincode - pincode
 * @param {String} data.landmark - Landmark
 * @param {String} data.phone - Phone Number
 * @param {String} data.email - Email
 */
const editUserProfile = async (data) => {
    try {
        await Users.update(data, {
            fields: [
                'name',
                'house',
                'ward',
                'area',
                'district',
                'pincode',
                'landmark',
                'email',
                'phone'
            ],
            where: {
                user_id: data.user_id
            }
        });
    } catch(err) {
        throw err;
    }
}

module.exports.editUserProfile = editUserProfile;


/**
 * Update user Address.
 * 
 * @param {Object} data - User address.
 * @param {Number} data.user_id - User ID
 * @param {String} data.house - House Name or Number
 * @param {Number} data.ward - Ward Number
 * @param {String} data.area - Area or locality
 * @param {String} data.district - District
 * @param {String} data.pincode - pincode
 * @param {String} data.landmark - Landmark
 */
const editUserAddress = async (data) => {
    try {
        data.address = Utils.formatAddress(data);

        await Users.update(data, {
            fields: [
                'house',
                'ward',
                'area',
                'district',
                'pincode',
                'landmark',
            ],
            where: {
                user_id: data.user_id
            }
        });

    } catch(err) {
        throw err;
    }
}

module.exports.editUserAddress = editUserAddress;

/**
 * Get the profile details of all users.
 * 
 * @param {Number} offset - Page Number.
 * @param {Number} limit - Number of items Per page.
 */
const getUserProfiles = async (offset, limit) => {
    try {
        const users = await Users.findAndCountAll({
            attributes: {
                exclude: [
                    'roles',
                    'usergroup',
                    'password',
                    'createdAt',
                    'updatedAt',
                    'deletedAt',
                ]
            },
            offset,
            limit
        });

        return users;
    } catch(err) {
        throw err;
    }
}

module.exports.getUserProfiles = getUserProfiles;
