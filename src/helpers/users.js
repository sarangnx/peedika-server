const Users = require('../models').users;
const Codes = require('../models').codes;
const Localbodies = require('../models').localbodies;
const Stores = require('../models').stores;
const StoreOwners = require('../models').store_owners;
const Utils = require('./utils');
const sequelize = require('../models').sequelize;

/**
 * Add User from admin panel,
 * Password reset link is sent through mail
 */
module.exports.addUser = async function (userdata) {
    Utils.required([
        'name',
        'email',
        'usergroup'
    ], userdata);

    let transaction;
    try {
        // Start a transaction.
        transaction = await sequelize.transaction();

        userdata.password = await Utils.hashPassword('password');
        userdata.usergroup = userdata.usergroup || 'user';
        userdata.ward = userdata.ward || null;
        userdata.phone = userdata.phone || null;

        const user = await Users.create(userdata, { transaction });

        if (userdata.usergroup === 'storeowner' || userdata.usergroup === 'delivery') {
            const localbody = await Localbodies.findOne({
                where: {
                    localbody_id: userdata.localbody_id,
                },
            });

            const store_id = localbody.store_id || null;
            if(!store_id) {
                throw new Error('Add Localbody before trying again.');
            }
            await StoreOwners.create({
                store_owner_id: user.user_id,
                store_id,
            }, { transaction });
        }

        const OTP = Utils.generateOTP();

        // clear all previous codes.
        await Codes.destroy({
            where: {
                user_id: user.user_id
            }
        }, { transaction });

        // store OTP in Database.
        await Codes.create({
            user_id: user.user_id,
            code: OTP
        }, { transaction });

        const message = `<p>Hi, ${user.name || user.email}</p>` +
            `<p>Your Peedika account was created. You can start using by ` +
            `visiting the link <a href="http://daflow.co.in">daflow.co.in</a></p>` +
            `<p>Your default password is 'password'. Please change it asap.</p>` +
            `<p>You can change your password by visiting <a href="http://daflow.co.in/reset">daflow.co.in/reset</a></p>` +
            `<p>Your OTP is <span style="font-size:20px;font-weight:bold;">${OTP}</span>.</p>` +
            `<p>Code is valid for 10 minutes only. Please DO NOT share this with anyone.</p>`;

        await Utils.sendMail(user.email, 'Account Generated for Peedika', message);

        transaction.commit();

        return user;
    } catch (err) {
        // If a transaction is started, Rollback
        if (transaction) {
            await transaction.rollback();
        }

        throw err;
    }

};

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
                model: Localbodies,
                as: 'localbody',
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt',
                        'deletedAt',
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
    } catch (err) {
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
                'localbody_id',
                'area',
                'district',
                'state',
                'pincode',
                'landmark',
                'email',
                'phone'
            ],
            where: {
                user_id: data.user_id
            }
        });
    } catch (err) {
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
                'localbody_id',
                'area',
                'district',
                'state',
                'pincode',
                'landmark',
            ],
            where: {
                user_id: data.user_id
            }
        });

    } catch (err) {
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
const getUserProfiles = async (offset, limit, usergroup = null) => {
    try {
        const users = await Users.findAndCountAll({
            include: [{
                model: Localbodies,
                as: 'localbody',
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt',
                        'deletedAt',
                    ]
                }
            }, {
                model: Stores,
                as: 'store',
                attributes: {
                    exclude: [
                        'opening_time',
                        'closing_time',
                        'createdAt',
                        'updatedAt',
                        'deletedAt',
                    ]
                },
                through: { attributes: [] } // don't show junction table
            }],
            attributes: {
                exclude: [
                    'roles',
                    'password',
                    'createdAt',
                    'updatedAt',
                    'deletedAt',
                ]
            },
            offset,
            limit,
            ...(usergroup && {
                where: {
                    usergroup,
                },
            }),
        });

        return users;
    } catch (err) {
        throw err;
    }
}

module.exports.getUserProfiles = getUserProfiles;


module.exports.addStore = async function (userdata) {
    let transaction;

    try {
        // Start a transaction.
        transaction = await sequelize.transaction();

        Utils.required([
            'user_id'
        ], userdata);

        const user = await Users.findOne({
            where: {
                user_id: userdata.user_id,
            },
            include: [{
                model: Localbodies,
                as: 'localbody',
                attributes: [ 'store_id' ],
                required: true
            }]
        });

        if( !user ) {
            throw new Error('User not associated to any localbody.');
        }

        if( user.localbody && !user.localbody.store_id ) {
            throw new Error('Localbody not associated to any stores.');
        }

        userdata.store_id = user.localbody && user.localbody.store_id;
        userdata.store_owner_id = userdata.user_id;

        const store = await StoreOwners.create(userdata, { transaction });

        await transaction.commit();

        return store;
    } catch (err) {
        // If a transaction is started, Rollback
        if (transaction) {
            await transaction.rollback();
        }

        throw err;
    }
}