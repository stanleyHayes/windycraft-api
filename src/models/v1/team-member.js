const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamMemberSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    socialMediaAccounts: {
        twitter: {
            type: String
        },
        instagram: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        }
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Service = mongoose.model('TeamMember', teamMemberSchema);

module.exports = Service;
