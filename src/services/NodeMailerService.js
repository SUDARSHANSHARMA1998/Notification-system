const nodemailer = require('nodemailer');
const { EMAIL_TEMPLATE } = require('../constants/NotificationTemplates')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sudarshanbot@gmail.com',
        pass: 'XXX'// Add Gmail APP password 
    }
});

const sendEmail = async function ( text = EMAIL_TEMPLATE, to = 'sudarshansharmano.1@gmail.com', subject = "Notification from Sudarshan's Notification Service") {
    try {
        const mailOptions = {
            from: 'sudarshanbot@gmail.com',
            to: to,
            subject: subject,
            text: text
        };
    
        const info = await transporter.sendMail(mailOptions)

        console.log('Email sent:', info.response);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = {
    sendEmail
}
