const Users = require('../models').users;
const UserDetails = require('../models').user_details;
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
            include: [{
                model: UserDetails,
                as: 'user_profile',
                attributes: {
                    exclude: [
                        'verification_code',
                        'createdAt',
                        'updatedAt',
                    ]
                }
            }],
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
 * @param {String} data.address1 - Address Line One
 * @param {String} data.address2 - Address Line Two
 * @param {String} data.address3 - Address Line Three
 * @param {String} data.city - City
 * @param {String} data.district - District
 * @param {String} data.state - State
 * @param {String} data.pincode - pincode
 * @param {String} data.landmark - Landmark
 * @param {String} data.phone - Phone Number
 * @param {String} data.email - Email
 */
const editUserProfile = async (data) => {

    try {

        data.address = Utils.formatAddress(data);

        await UserDetails.upsert(data,{
            fields: [
                'name',
                'address'
            ],
            where: {
                user_id: data.user_id
            }
        });

        await Users.update(data, {
            fields: [
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
 * @param {String} data.address1 - Address Line One
 * @param {String} data.address2 - Address Line Two
 * @param {String} data.address3 - Address Line Three
 * @param {String} data.city - City
 * @param {String} data.district - District
 * @param {String} data.state - State
 * @param {String} data.pincode - pincode
 * @param {String} data.landmark - Landmark
 */
const editUserAddress = async (data) => {

    try {

        data.address = Utils.formatAddress(data);

        await UserDetails.upsert(data,{
            fields: [
                'address'
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
            include: [{
                model: UserDetails,
                as: 'user_profile',
                attributes: {
                    exclude: [
                        'user_id',
                        'verification_code',
                        'createdAt',
                        'updatedAt',
                    ]
                }
            }],
            attributes: {
                exclude: [
                    'roles',
                    'usergroup',
                    'password',
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
