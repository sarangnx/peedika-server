const Localbodies = require('../helpers/localbodies');

module.exports = {

    /**
     * Create localbody
     */
    async createLocalbody(data, req, res, next) {
        try {
            const localbody = req.body;

            await Localbodies.createLocalbody(localbody);

            res.json({
                status: 'success',
                message: 'Localbody created.'
            });
        } catch(err) {
            next(err);
        }
    },

    /**
     * Get full details of a localbody.
     */
    async getLocalbodyById(data, req, res, next) {
        try {
            const { localbody_id } = req.params;

            const localbody = await Localbodies.getLocalbodyById(localbody_id);

            res.json({
                status: 'success',
                localbody,
            });
        } catch(err) {
            next(err);
        }
    }
}
