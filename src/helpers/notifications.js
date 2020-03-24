const admin = require('firebase-admin');

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const fcm = admin.messaging();


/**
 * Send notifications to topic 'offers'
 * 
 * @param {String} data.notif_title - Notification Title.
 * @param {String} data.notif_body - Notification Body.
 * @param {Number} data.offer_id - Offer ID for creating offer link.
 */
const send = async (data) => {
    
    let url;
    if(data.offer_id){
        url = `/api/inventory/items/offers?offer_id=${data.offer_id}`;
    }

    // Notification payload
    const payload = {
        notification: {
            title: data.notif_title,
            body: data.notif_body,
            click_action: 'FLUTTER_NOTIFICATION_CLICK'
        },
        data: {
            url: url
        }
    };
  
    await fcm.sendToTopic('offers', payload);
}

module.exports.send = send;
