const Ration = require('../models').ration;
const Users = require('../models').users;
const Localbodies = require('../models').localbodies;
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

    async listEntries(options = {}){
        const rations = await Ration.findAndCountAll({
            include: [{
                model: Users,
                as: 'user',
                required: true,
                include:[{
                    model: Localbodies,
                    as: 'localbody',
                    ...(options.localbody_id && {
                        where: {
                            localbody_id: options.localbody_id,
                        },
                        required: true,
                    }),
                }]
            }],
            ...(options.offset && { offset: options.offset }),
            ...(options.limit && { limit: options.limit }),
        });

        return rations
    }
}
