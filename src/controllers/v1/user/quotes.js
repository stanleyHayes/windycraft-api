const Quote = require("./../../../models/v1/quote");
const validator = require("validator/es");
const moment = require("moment");

exports.createQuote = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            company,
            website,
            services,
            information,
            startDate,
            budget,
            message
        } = req.body;

        if (!firstName || !lastName || !email || !phone || !services || !startDate || !budget || !message)
            return res.status(400).json({message: 'Missing required fields'});
        if (!validator.isEmail(email)) return res.status(400).json({message: `Invalid email: ${email}`});
        if (!validator.isEmail(email)) return res.status(400).json({message: `Invalid phone: ${phone}`});
        if (services.length === 0) return res.status(400).json({message: 'Select at least one service'});
        if (moment().isBefore(startDate)) return res.status(400).json({message: 'Start date cannot be in the past'});
        await Quote.create({
            firstName,
            lastName,
            email,
            phone,
            services,
            startDate,
            company,
            message,
            information,
            website
        });

        // send text message to both sender and recipient
        // send email to both sender and recipient
        res.status(201).json({message: 'Message received. We would respond to your message as soon as possible'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
