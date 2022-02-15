const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`Invalid email: ${value}`);
            }
        }
    },
    phone: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`Invalid email: ${value}`);
            }
        }
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    services: {
        type: [String],
    },
    information: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    responded: {
        type: Boolean,
        default: false
    },
    response: {
        type: String
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
