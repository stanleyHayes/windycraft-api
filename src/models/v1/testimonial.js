const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 5
    },
    review: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'blocked'],
        default: 'pending'
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
