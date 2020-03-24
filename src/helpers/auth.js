const Users = require('../models').users;
const Codes = require('../models').codes;
const Utils = require('./utils');
const { sequelize, Sequelize } = require('../models')


/**
 * Register a new user.
 * Common for store and regular users.
 * @param {Object} userdata - Contains raw username and password.
 * @param {Object} options - Contains usergroup and roles.
 */
const registerUser = async (userdata, options) => {

    let fieldName = getFieldName(userdata.username);

    /***
     * Add username as (phone|email) and password fields
     * to options object, to pass to Database.
     */
    options[fieldName] = userdata.username;
    options.password = Utils.hashPassword(userdata.password);

    let transaction;
    try {
        transaction = await sequelize.transaction();
        const user = await Users.create(options,{ transaction });

        await transaction.commit();

        return user;
    } catch(err) {

        // If a transaction is started, Rollback
        if( transaction ){
            await transaction.rollback();
        }

        throw err;
    }

}

module.exports.registerUser = registerUser;


/**
 * Used to send otp to user to change their passwords.
 * @param {String} username - email or phone number that is used as a login username
 */
const forgotPassword = async (username) => {

    try {

        let fieldName = getFieldName(username);

        // find the user using given username
        const user = await Users.findOne({
            where: {
                [fieldName]: username
            }
        });


        // Generate OTP
        const OTP = Utils.generateOTP();

        let html, sms;
        let subject = `Password Reset for Ashokanz Online`;

        // customize message in case the user is not found in the database.
        if(user) {

            // clear all previous codes.
            await Codes.destroy({
                where: {
                    user_id: user.user_id
                }
            });

            // store OTP in Database.
            await Codes.create({
                user_id: user.user_id,
                code: OTP
            });

            // Define subject and message for email
            html = `<p>Hi, You recently requested to reset your password for your` +
                ` Ashokanz Online Account.<p>` + 
                `<p>Your OTP is <span style="font-size:20px;font-weight:bold;">${OTP}</span>.</p>` + 
                `<p>Code is valid for 10 minutes only. Please DO NOT share this with anyone.</p>`;

            sms = `Your OTP for Ashokanz Online is ${OTP}.`;

        } else {
            html = `<p>Hi, You recently requested a password reset at Ashokanz Online. ` +
                `But we could not find any account linked to this email.</p>` +
                `<p>Are you sure you used this email for login?</p>`;

            sms = `Sorry! We could not find any account linked to this mobile number.`;
        }


        // Send sms or email depending on the username provided.
        if ( fieldName === 'phone' ) {
            await Utils.sendSMS(username, sms);
        } else if ( fieldName === 'email' ) {
            await Utils.sendMail(username, subject, html);
        }

    } catch(err) {
        throw err;
    }
}

module.exports.forgotPassword = forgotPassword;


/**
 * Verify whether the given OTP exists or not. If it exists, set verified to true.
 * @param {String} OTP - OTP code.
 * @param {String} username - Email or phone number used for login.
 */
const verifyOTP = async (OTP, username) => {

    try {

        let fieldName = getFieldName(username);

        // find the user using given username
        const user = await Users.findOne({
            where: {
                [fieldName]: username
            }
        });

        // get timestamp equals to now - 10 minutes
        const timestamp = new Date( new Date().getTime() - 10 * 60000 );

        // find an entry for valid otp of the user.
        const code = await Codes.findOne({
            where: {
                code: OTP,
                verified: false,
                user_id: user.user_id,
                createdAt: {
                    // createdAt >= timestamp
                    [Sequelize.Op.gte]: timestamp 
                }
            }
        });

        // If no code is found return false
        if( !code ) {
            return false;
        }

        // If code found, set verified to true.
        code.set('verified', true);
        await code.save();

        return true;

    } catch(err) {
        throw err;
    }

}

module.exports.verifyOTP = verifyOTP;


/**
 * Change password.
 * 
 * @param {Number} username - Email or password used for login.
 * @param {String} password - new password
 * @param {String} otp - OTP code sent for verification.
 */
const changePassword = async (username, password, otp) => {

    try {

        let fieldName = getFieldName(username);

        // get timestamp equals to now - 10 minutes
        const timestamp = new Date( new Date().getTime() - 10 * 60000 );

        // find the user using given username
        const user = await Users.findOne({
            where: {
                [fieldName]: username
            },
            include: [{
                model: Codes,
                as: 'code',
                where: {
                    verified: true,
                    createdAt: {
                        // createdAt >= timestamp
                        [Sequelize.Op.gte]: timestamp 
                    }
                }
            }]
        });

        if( user.code.code !== otp ){
            throw new Error('OTP expired');
        }

        // hash the password.
        const passwordHash = Utils.hashPassword(password);

        user.set('password', passwordHash);
        await user.save();

    } catch(err) {
        throw err;
    }

}

module.exports.changePassword = changePassword;


/**
 * Check if the username is email or phone number and return the type.
 * @param {String} username - Email or phone number used for login. 
 */
const getFieldName = (username) => {

    const phoneRegEx = /^[0-9]{10}$/g;
    const emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    /***
     * Check if username is a phone number or email
     * and give name to field accordingly.
     */
    let fieldName = '';
    if(phoneRegEx.test(username)) {
        fieldName = 'phone';
    } else if(emailRegEx.test(username)) {
        fieldName = 'email';
    } else {
        throw new Error('Invalid Phone / Email');
    }

    return fieldName;
}
