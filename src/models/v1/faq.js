const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const faqSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;
