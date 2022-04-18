const sgMail = require('@sendgrid/mail');
const {sendgridAPIKey, fromEmail} = require("../config/keys");


sgMail.setApiKey(sendgridAPIKey);


const sendEmail = async (email, subject, text) => {
    console.log(email, subject, text);
    try {
        const msg = {
            to: email,
            from: fromEmail,
            subject,
            text
        };
        await sgMail.send(msg);
        console.log('message sent')
    } catch (e) {
        console.log(e.message, 'send email forbidden')
    }
}

module.exports = {sendEmail};
