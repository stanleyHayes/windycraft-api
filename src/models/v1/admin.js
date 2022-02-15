const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(`Invalid email ${value}`);
            }
        }
    },
    image: {
        type: String
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error(`Password must contain at least a digit, uppercase, lowercase, special character and at least 8 characters long`);
            }
        }
    },
    authInfo: {
        otp: {
            type: String,
            minlength: 6
        },
        validUntil: {
            type: Date
        },
        token: {
            type: String,
        }
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'pending'],
        status: 'pending'
    },
    permissions: {
        faqs: {
            read: {
                type: Boolean,
                default: false
            },
            create: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            }
        },
        invitations: {
            read: {
                type: Boolean,
                default: false
            },
            create: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            }
        },
        clients: {
            read: {
                type: Boolean,
                default: false
            },
            create: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            }
        },
        admins: {
            read: {
                type: Boolean,
                default: false
            },
            create: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            }
        },
        messages: {
            read: {
                type: Boolean,
                default: false
            },
            create: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            },
            reply: {
                type: Boolean,
                default: false
            }
        },
        quotes: {
            read: {
                type: Boolean,
                default: false
            },
            create: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            },
            reply: {
                type: Boolean,
                default: true
            }
        },
        sales: {
            read: {
                type: Boolean,
                default: false
            },
            create: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            }
        },
        services: {
            read: {
                type: Boolean,
                default: false
            },
            create: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            }
        },
        teams: {
            read: {
                type: Boolean,
                default: false
            },
            create: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            }
        },
        testimonials: {
            read: {
                type: Boolean,
                default: false
            },
            create: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            },
            approve: {
                type: Boolean,
                default: false
            },
            refuse: {
                type: Boolean,
                default: false
            }
        }
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
