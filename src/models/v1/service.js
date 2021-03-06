const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
