const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
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
    phone: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error(`Invalid phone ${value}`);
            }
        }
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
            minlength: 4
        },
        otpValidUntil: {
            type: Date
        },
        token: {
            type: String,
        }
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'pending'],
        default: 'pending'
    },
    permissions: {
        faqs: {
            read: {
                type: Boolean,
                default: true
            },
            create: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: true
            },
            remove: {
                type: Boolean,
                default: true
            }
        },
        invitations: {
            read: {
                type: Boolean,
                default: true
            },
            create: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: true
            },
            remove: {
                type: Boolean,
                default: true
            }
        },
        clients: {
            read: {
                type: Boolean,
                default: true
            },
            create: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: true
            },
            remove: {
                type: Boolean,
                default: true
            }
        },
        admins: {
            read: {
                type: Boolean,
                default: true
            },
            create: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: true
            },
            remove: {
                type: Boolean,
                default: true
            }
        },
        messages: {
            read: {
                type: Boolean,
                default: true
            },
            create: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: true
            },
            remove: {
                type: Boolean,
                default: true
            },
            reply: {
                type: Boolean,
                default: true
            }
        },
        quotes: {
            read: {
                type: Boolean,
                default: true
            },
            create: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: true
            },
            remove: {
                type: Boolean,
                default: true
            },
            reply: {
                type: Boolean,
                default: true
            }
        },
        values: {
            read: {
                type: Boolean,
                default: true
            },
            create: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: true
            },
            remove: {
                type: Boolean,
                default: true
            }
        },
        services: {
            read: {
                type: Boolean,
                default: true
            },
            create: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: true
            },
            remove: {
                type: Boolean,
                default: true
            }
        },
        teams: {
            read: {
                type: Boolean,
                default: true
            },
            create: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: true
            },
            remove: {
                type: Boolean,
                default: true
            }
        },
        testimonials: {
            read: {
                type: Boolean,
                default: true
            },
            create: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: true
            },
            remove: {
                type: Boolean,
                default: true
            },
            approve: {
                type: Boolean,
                default: true
            },
            refuse: {
                type: Boolean,
                default: true
            }
        }
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
