const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
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
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error(`Invalid phone ${value}`);
            }
        }
    },
    emergencyPhoneNumber: {
        type: String,
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
    devices: {
        type: [
            {
                token: {type: String, required: true},
                isMobile: {type: Boolean, required: true},
                isDesktop: {type: Boolean, required: true},
                browser: {type: String, required: true},
                os: {type: String, required: true},
                platform: {type: String, required: true},
                source: {type: String, required: true}
            }
        ]
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
                default: false
            }
        },
        values: {
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
        },
        permissions: {
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
}, {timestamps: {createdAt: false, updatedAt: false}});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
