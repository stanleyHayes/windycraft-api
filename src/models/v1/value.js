const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const valueSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Value = mongoose.model('Value', valueSchema);

module.exports = Value;
