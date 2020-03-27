const Localbodies = require('../models').localbodies;
const Utils = require('./utils');

module.exports = {

    /**
     * 
     * @param {Object} data - Localbody data
     * @param {String} name - Localbody Name
     * @param {String} code - Localbody Code
     * @param {String} district - District
     * @param {String} state - State
     * @param {Number} total_wards - Total number of wards
     * @param {Array} available_wards - List of available wards.
     * @param {String} type - type of localbody
     * @param {String} phone - General phone
     * @param {String} emergency_phone - Emergency number
     * @param {String} kitchen_phone - kitchen phone
     * @param {String} email - Email
     * @param {Boolean} status - status of localbody
     */
    async createLocalbody(data) {
        Utils.required(data, [
            'name',
            'district',
        ]);

        if(data.state) {
            data.state = data.state.toLowerCase();
        }

        if(data.district) {
            data.district = data.district.toLowerCase();
        }

        if(data.type) {
            data.type = data.type.toLowerCase();
        }

        await Localbodies.create(data);
    },
};

