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
            if(!validator.isMobilePhone(value)){
                throw new Error(`Invalid phone: ${value}`);
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
    },
    status: {
        type: String,
        enum: ['responded', 'pending', 'read'],
        default: 'pending'
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
