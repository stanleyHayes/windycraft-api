const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    logo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
