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
     * Edit localbody
     */
    async editLocalbody(data, req, res, next) {
        try {
            const localbody = req.body;

            await Localbodies.editLocalbody(localbody);

            res.json({
                status: 'success',
                message: 'Localbody updated.'
            });
        } catch(err) {
            next(err);
        }
    },

    /**
     * Get full details of a localbody.
     */
    async getLocalbodyById(req, res, next) {
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
    },

    async listLocalbodies(req, res, next) {
        try {
            const options = req.query;
            
            if(options.page) {
                options.per_page = options.per_page || 10;
                options.offset = ( parseInt(options.page) - 1 ) * parseInt(options.per_page);
            }

            if(options.per_page) {
                options.limit = parseInt(options.per_page);
            }

            const localbodies = await Localbodies.listLocalbodies(options);

            res.json({
                status: 'success',
                localbodies,
            });
        } catch(err) {
            next(err);
        }
    },

    async listDistricts(req, res, next) {
        try {
            const districts = await Localbodies.listDistricts();

            res.json({
                status: 'success',
                districts,
            });
        } catch (err) {
            next(err);
        }
    },

    /**
     * Add store after creating localbody
     */
    async addStore(data, req, res, next) {
        try {
            const userdata = req.body;

            await Localbodies.addStore(userdata);

            res.json({
                status: 'success',
                message: 'Store added.'
            });
        } catch (err) {
            next(err);
        }
    }
}
