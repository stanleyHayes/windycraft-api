const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const invitationSchema = new Schema({
    invitee: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    inviter: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(`Invalid email: ${value}`);
            }
        }
    },
    status: {
        type: String,
        enum: ['expired', 'pending', 'accepted'],
        default: 'pending'
    },
    expiryDate: {
        type: Date,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
