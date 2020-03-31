const Ration = require('../helpers/ration');

module.exports = {

    async createEntry(data, req, res, next) {
        try {
            const userdata = req.body;
            userdata.user_id = userdata.user_id || data.data.user_id;

            await Ration.createEntry(userdata);

            res.json({
                status: 'success',
                message: 'Entry Added.'
            });
        } catch (err) {
            next(err);
        }
    },

    /**
     * List Rations
     */
    async listEntries(data, req, res, next) {
        try {
            const options = req.query;

            if(options.page) {
                options.per_page = options.per_page || 10;
                options.offset = ( parseInt(options.page) - 1 ) * parseInt(options.per_page);
            }

            if(options.per_page) {
                options.limit = parseInt(options.per_page);
            }

            const rations = await Ration.listEntries(options);

            res.json({
                status: 'success',
                rations,
            });
        } catch (err) {
            next(err);
        }
    }
};
