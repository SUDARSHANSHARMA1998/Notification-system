const accountSid = 'ACc73e00f280efbcc4310c2ae050fe1090';
const authToken = 'XXXX';
const client = require('twilio')(accountSid, authToken);
const { SMS_TEMPLATE } = require('../constants/NotificationTemplates')

const sendSMS = async function(messageBody = SMS_TEMPLATE, recipientPhoneNumber) {
    try{
        const message = await client.messages.create({
            body: messageBody,
            from: '+16502638733',
            to: recipientPhoneNumber
        });

        console.log("SMS sent successfully", message)
    } catch(err) {
        console.log("Unable to send the SMS", err)

        throw err
    }
}

module.exports = {
    sendSMS
}



// 16502638733