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
    }
};
