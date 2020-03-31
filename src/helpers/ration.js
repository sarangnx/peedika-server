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
                    where: {
                        ...(options.localbody && {
                            localbody_id: parseInt(options.localbody),
                        }),
                        ...(options.district && {
                            district: options.district,
                        }),
                    },
                    ...((options.localbody || options.district) && { required: true }),
                }],
                where: {
                    ...(options.ward && { ward: options.ward }),
                },
            }],
            ...(options.offset && { offset: options.offset }),
            ...(options.limit && { limit: options.limit }),
        });

        return rations
    }
}
