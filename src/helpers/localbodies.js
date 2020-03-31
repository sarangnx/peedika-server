const Localbodies = require('../models').localbodies;
const Utils = require('./utils');
const sequelize = require('../models').sequelize;

module.exports = {

    /**
     * Add a new localbody
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
        Utils.required([
            'name',
            'district',
        ], data);

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

    /**
     * Get full details of a localbody.
     * @param {Number} localbody_id - Localbody Id
     */
    async getLocalbodyById(localbody_id) {
        const localbody = await Localbodies.findOne({
            where: {
                localbody_id,
            },
        });

        return localbody;
    },

    /**
     * Get list of localbodies
     * @param {Object} options - List options
     * @param {Number} options.offset - - The row from which find is to be started.
     * @param {Number} options.limit - Number of rows to be returned.
     * @param {String} options.type - Filter by type of localbody
     * @param {String} options.district - Filter by district
     * @param {String} options.state - Filter by state
     */
    async listLocalbodies(options = {}) {
        // convert all to lowercase
        options.state = options.state? options.state.toLowerCase() : null;
        options.district = options.district? options.district.toLowerCase() : null;
        options.type = options.type? options.type.toLowerCase() : null;

        const localbodies = await Localbodies.findAndCountAll({
            where: {
                ...(options.type && { type: options.type }),
                ...(options.state && { state: options.state }),
                ...(options.district && { district: options.district }),
            },
            ...(options.offset && { offset: options.offset }),
            ...(options.limit && { limit: options.limit }),
        });

        return localbodies;
    },

    /**
     * Get list of districts
     */
    async listDistricts() {
        const districts = await Localbodies.findAndCountAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('district')), 'name']]
        });

        return districts;
    }
};

