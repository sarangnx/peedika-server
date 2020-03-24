const _ = require('lodash');
const bcrypt = require('bcryptjs');
const convert = require('convert-units');
const nodemailer = require('nodemailer');
const axios = require('axios');

/***
 * Limit conversion to 'ml', 'l', 'g', 'kg' only.
 */
const massexclude = [ 'mcg', 'mg', 'mt', 'oz', 'lb', 't'];
const volumeexclude = [ 'mm3', 'cm3', 'ml', 'cl', 'dl', 'kl', 'm3', 'km3', 'krm', 'tsk', 'msk', 'kkp', 'glas', 'kanna', 'tsp', 'Tbs', 'in3', 'fl-oz', 'cup', 'pnt', 'qt', 'gal', 'ft3', 'yd3'];

/**
 * Method used to hash password.
 * This is a synchronous method.
 *
 * @param {String} password - Password
 * @returns {String} - Hashed Password
 */
const hashPassword = (password) => {
    let hash = bcrypt.hashSync(password,8);
    return hash;
}

module.exports.hashPassword = hashPassword;


/**
 * Format the Address for adding to database.
 *
 * @param {Object} data - User data
 */
const formatAddress = (data) => {
    // format address
    let address = {
        address1: data.address1 || null,
        address2: data.address2 || null,
        address3: data.address3 || null,
        city: data.city || null,
        district: data.district || null,
        state: data.state || null,
        pincode: data.pincode || null,
        landmark: data.landmark || null,
        phone: data.phone || null
    }

    // remove null properties.
    address = _.pickBy(address, _.identity);

    return address;
}

module.exports.formatAddress = formatAddress;


/**
 * Create an invoice number for an order.
 *
 * @param {Object} data
 * @param {Number} data.store_id - Store ID
 * @param {Number} data.user_id - User ID
 *
 * @returns {String} An invoice number somthing like this
 * AUG122019T123021-STR12-USR2
 */
const generateInvoiceNumber = ({ store_id, user_id }) => {
    let d = new Date();
    let date = d.toDateString();
    let time = d.toTimeString();

    // remove 3 letter day and a space
    // and convert to uppercase.
    // then remove white spaces.
    // Eg: AUG 25 2019
    date = date.slice(4).toUpperCase().replace(/\s/g,'');

    // split time string from GMT and take first half.
    // remove trailing spaces.
    time = time.split('GMT')[0].trim().replace(/:/g,'');

    return `${date}T${time}-STR${store_id}-USR${user_id}`;
}

module.exports.generateInvoiceNumber = generateInvoiceNumber;


/**
 * Used to throw an error if Object keys are missing.
 *
 * @param {Array} properties - Array of properties / object key names.
 * @param {Object} object - Object which is to be checked.
 * @throws {Error} If a property is not found in the object.
 */
const required = (properties, object = {}) => {

    // sometimes object passed from the express has no prototype.
    // so add hasOwnProperty method to the object.
    object.hasOwnProperty = Object.hasOwnProperty;

    properties.forEach((property) => {
        if( !object.hasOwnProperty(property) ){
            throw new Error(`${property} required.`);
        }
    });

}

module.exports.required = required;


/**
 * Calculate the price of a given quantity of an item,
 * based on the base quantity, unit and price.
 *
 * @param {Object} data
 * @param {Number} data.base_price - Base price is the market price or offer price.
 * @param {Number} data.base_quantity - Base quantity of the item.
 * @param {String} data.base_unit - Unit of the base quantity.
 * @param {Number} data.quantity - Quantity purchased by user.
 * @param {String} data.unit - Unit of the quantity purchased by user.
 *
 * @returns {Number} Price of the item purchased by the user.
 */
const calculatePrice = (data) => {

    required([
        'base_price',
        'base_quantity',
        'base_unit',
        'quantity',
        'unit'
    ], data);

    let {
        base_price,
        base_quantity,
        base_unit,
        quantity,
        unit
    } = data;

    let price;

    // quantities of units other than count are to be converted.
    if( base_unit !== 'count' ) {

        // convert quantity passed by user from unit to base unit.
        quantity = convert(quantity).from(unit).to(base_unit);

        base_price = parseFloat(base_price);
        base_quantity = parseFloat(base_quantity);

    }

    // price of the item as per user's quantity and unit.
    price =  ( base_price / base_quantity ) * quantity;

    return price;

}

module.exports.calculatePrice = calculatePrice;


/**
 * Add 2 Quantities
 * @param {Object} data - Object with 2 quantities.
 * @param {Number} data.quantity1 - Quantity 1
 * @param {String} data.unit1 - Unit of Quantity 1
 * @param {Number} data.quantity2 - Quantity 2
 * @param {String} data.unit2 - Unit of Quantity 2
 *
 * @returns {Object} { quantity: Number, unit: String }
 */
const addQuantity = ({ quantity1, unit1, quantity2, unit2 }) => {

    let quantity;
    let conversion;

    switch(unit1) {
        // Convert Mass and calculate
        case 'g' :
        case 'kg':
            quantity1 = parseFloat(convert(quantity1).from(unit1).to('g'));
            quantity2 = parseFloat(convert(quantity2).from(unit2).to('g'));

            quantity = quantity1 + quantity2;
            conversion = convert(quantity).from('g').toBest({ exclude: massexclude });
            break;
        // Convert Volume and calculate
        case 'ml':
        case 'l' :
            quantity1 = parseFloat(convert(quantity1).from(unit1).to('ml'));
            quantity2 = parseFloat(convert(quantity2).from(unit2).to('ml'));

            quantity = quantity1 + quantity2;
            conversion = convert(quantity).from('ml').toBest({ exclude: volumeexclude });
            break;
        // calculate for count
        case 'count':
            quantity = parseFloat(quantity1) + parseFloat(quantity2);
            conversion = {
                val: quantity,
                unit: 'count'
            }
            break;
    }

    return {
        quantity: parseFloat(conversion.val).toFixed(3),
        unit: conversion.unit
    }
}

module.exports.addQuantity = addQuantity;


/**
 * Subtract 2 Quantities
 * @param {Object} data - Object with 2 quantities.
 * @param {Number} data.quantity1 - Quantity 1 (Must be larger than Quantity 2)
 * @param {String} data.unit1 - Unit of Quantity 1
 * @param {Number} data.quantity2 - Quantity 2
 * @param {String} data.unit2 - Unit of Quantity 2
 *
 * @returns {Object} { quantity: Number, unit: String }
 */
const subtractQuantity = ({ quantity1, unit1, quantity2, unit2 }) => {

    let quantity;
    let conversion;

    switch(unit1) {
        // Convert Mass and calculate
        case 'g' :
        case 'kg':
            quantity1 = parseFloat(convert(quantity1).from(unit1).to('g'));
            quantity2 = parseFloat(convert(quantity2).from(unit2).to('g'));

            quantity = quantity1 - quantity2;

            conversion = convert(quantity).from('g').toBest({ exclude: massexclude });
            break;
        // Convert Volume and calculate
        case 'ml':
        case 'l' :
            quantity1 = parseFloat(convert(quantity1).from(unit1).to('ml'));
            quantity2 = parseFloat(convert(quantity2).from(unit2).to('ml'));

            quantity = quantity1 - quantity2;

            conversion = convert(quantity).from('ml').toBest({ exclude: volumeexclude });
            break;
        // calculate for count
        case 'count':

            quantity = parseFloat(quantity1) - parseFloat(quantity2);

            conversion = {
                val: quantity,
                unit: 'count'
            }
            break;
    }

    return {
        quantity: parseFloat(conversion.val).toFixed(3),
        unit: conversion.unit
    }
}

module.exports.subtractQuantity = subtractQuantity;


/**
 * Convert a given quantity of a unit to all its possible units.
 *
 * @param {Number} quantity - Quantity
 * @param {String} unit - Unit
 */
const convertToAll = (quantity, unit) => {

    quantity = parseFloat(quantity);

    let conversion = {};

    switch(unit) {
        case 'g' :
        case 'kg':
            let g = convert(quantity).from(unit).to('g');
            let kg = convert(quantity).from(unit).to('kg');

            conversion = Object.assign({},{
                g: {
                    quantity: parseFloat(g)
                },
                kg: {
                    quantity: parseFloat(kg)
                }
            });
            break;

        case 'ml':
        case 'l' :
            let ml = convert(quantity).from(unit).to('ml');
            let l = convert(quantity).from(unit).to('l');

            conversion = Object.assign({},{
                ml: {
                    quantity: parseFloat(ml)
                },
                l: {
                    quantity: parseFloat(l)
                }
            });
            break;
    }

    return conversion;

}

module.exports.convertToAll = convertToAll;


/**
 * Compares 2 quantities and returns true if a <= b and
 * false if a > b.
 *
 * @param {Object} a - Supposed to be the smaller quantity.
 * @param {Number} a.quantity - Quantity
 * @param {String} a.unit - Unit
 * @param {Object} b - Supposed to be the larger quantity.
 * @param {Number} b.quantity - Quantity
 * @param {String} b.unit - Unit
 */
const compare = (a, b) => {

    if(a.unit !== 'count' && b.unit !== 'count' ){
        a.quantity = convert(a.quantity).from(a.unit).to(b.unit);
    }

    a.quantity = parseFloat(a.quantity);
    b.quantity = parseFloat(b.quantity);

    if( a.quantity <= b.quantity ){
        return true;
    } else {
        return false;
    }

}

module.exports.compare = compare;


/**
 * Send emails using nodemailer.
 * @param {*} receiver - Email address of the reciever.
 * @param {*} subject - Subject of the email.
 * @param {*} messagetext - html message body.
 */
const sendMail = async (receiver, subject, messagetext) => {

    let transporter = await nodemailer.createTransport(
        {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        },
        {
            // default message fields

            // sender info
            from: `Ashokanz Online <${process.env.SMTP_USER}>`,
        }
    );

    let message = {
        to: `<${receiver}>`,
        subject: subject,
        html: messagetext
    }

    await transporter.sendMail(message);
}

module.exports.sendMail = sendMail;


/**
 * Create an OTP string.
 * @param {Number} length - Length of output string.
 */
const generateOTP = ( length = 6 ) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let chLength = characters.length;

    for( let i = 0; i < length; i++ ){
        result += characters.charAt(Math.floor(Math.random() * chLength));
    }

    return result;
}

module.exports.generateOTP = generateOTP;


/**
 *
 * @param {Number} receiver - Phone Number of the Receiver.
 * @param {String} message - Message Text.
 */
const sendSMS = async ( receiver, message ) => {

    receiver = receiver.toString();
    if(receiver.length === 10){
        // prepend countrycode (default: India [91] )
        receiver = `91${receiver}`;
    } else {
        // remove + from string
        receiver = receiver.toString();
        receiver.replace('+', '');
    }

    const params = new URLSearchParams();
    params.append('username', process.env.TEXTLOCAL_USERNAME);
    params.append('hash', process.env.TEXTLOCAL_API_KEY);
    params.append('numbers', parseInt(receiver));
    params.append('message', message);
    params.append('sender', process.env.TEXTLOCAL_SENDER);

    await axios({
        method: 'post',
        url: 'https://api.textlocal.in/send/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: params
    });
}

module.exports.sendSMS = sendSMS;


const dateString = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

module.exports.dateString = dateString;

const timeString = () => {
    let date = new Date();
    let hour = date.getHours();
    let mins = `0${date.getMinutes()}`.slice(-2);
    let ampm = hour >= 12 ? 'PM' : 'AM'; 
    hour = hour > 12 ? hour - 12 : hour;
    hour = `0${hour}`.slice(-2);

    return `${hour}:${mins} ${ampm}`;
}

module.exports.timeString = timeString;
