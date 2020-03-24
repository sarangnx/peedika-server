const Notifications = require('../helpers/notifications');

/**
 * Send notifications to topic 'offers'
 * 
 * @param {String} req.body.notif_title - Notification Title.
 * @param {String} req.body.notif_body - Notification Body.
 * @param {Number} req.body.offer_id - Offer ID for creating offer link.
 */
const send = async (data, req, res, next) => {
    try{

        const data = req.body;

        await Notifications.send(data);
        
        res.json({
            status: 'success',
            message: 'Notifications sent successfully!'
        });

    } catch(err) {
        next(err);
    }
}

module.exports.send = send;
