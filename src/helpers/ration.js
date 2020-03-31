const Ration = require('../models').ration;
const Utils = require('./utils');

module.exports = {
    /**
     * Create an entry for ration
     * @param {Object} userdata - Userdata
     */
    async createEntry(userdata) {
        Utils.required([
            'user_id',
            'name',
        ], userdata);

        Utils.requireAny([
            'card_no',
            'aadhar_no'
        ], userdata);

        const ration = await Ration.create(userdata);

        return ration;
    },
}
