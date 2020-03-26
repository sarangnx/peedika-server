const admin = require('firebase-admin');

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const fcm = admin.messaging();


/**
 * Send notifications to topic 'announcements'
 * 
 * @param {String} data.notif_title - Notification Title.
 * @param {String} data.notif_body - Notification Body.
 * @param {Number} data.offer_id - Offer ID for creating offer link.
 */
const send = async (data) => {

    // Notification payload
    const payload = {
        notification: {
            title: data.notif_title,
            body: data.notif_body,
            click_action: 'FLUTTER_NOTIFICATION_CLICK'
        },
    };
  
    await fcm.sendToTopic('announcements', payload);
}

module.exports.send = send;
