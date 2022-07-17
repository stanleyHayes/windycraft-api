const Admin = require('./../../../models/v1/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const moment = require('moment');

const {generateOTP} = require("../../../utils/otp-generator");
const {sendEmail} = require("../../../utils/emails");

exports.register = async (req, res) => {
    try {
        const {email, phone, password, name, username} = req.body;
        if (!email || !phone || !password || !name || !username)
            return res.status(400).json({message: 'Missing required fields', data: null});
        const existingUser = await Admin.findOne({email});
        if (existingUser)
            return res.status(409).json({message: `Email ${email} is already taken`, data: null});
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({message: 'Enter a strong password', data: null});
        }
        const otp = generateOTP(process.env.OTP_LENGTH, {
            digits: true, alphabets: false, specialChars: false, upperCase: false
        });
        const otpValidUntil = moment().add(30, 'days');
        const admin = await Admin.create({
            email,
            phone,
            name,
            password: await bcrypt.hash(password, 10),
            authInfo: {
                otp,
                otpValidUntil,
            },
            username
        });

        const token = await jwt.sign({_id: admin._id.toString()}, process.env.JWT_SECRET, {expiresIn: '30days'}, null);
        admin.authInfo.token = token;
        const url = `https://supercraftgh.vercel.app/auth/verify/${token}`;
        const message = `Click on the link ${url} and verify your email with the otp ${otp}`;
        await admin.save();
        await sendEmail(email, 'VERIFY ACCOUNT WITH SUPERCRAFT GH', message);
        res.status(201).json({message: `Account Created Successfully`, data: admin, token});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password)
            return res.status(400).json({message: 'Missing required fields', data: null});
        const admin = await Admin.findOne({email});
        if (!admin)
            return res.status(401).json({data: null, message: 'Authentication Failed'});
        const passwordsMatch = await bcrypt.compare(password, admin.password);
        if (!passwordsMatch)
            return res.status(401).json({data: null, message: 'Authentication Failed'});
        if (admin.status === 'pending')
            return res.status(400).json({message: 'Please verify your account', data: null});
        const token = await jwt.sign({_id: admin._id}, process.env.JWT_SECRET, {expiresIn: '30days'}, null);
        admin.devices = admin.devices.concat({
            token,
            isMobile: req.useragent.isMobile,
            isDesktop: req.useragent.isDesktop,
            browser: req.useragent.browser,
            os: req.useragent.os,
            platform: req.useragent.platform,
            source: req.useragent.source
        });
        await admin.save();
        res.status(200).json({message: `Successfully Logged In`, data: admin, token});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.getProfile = async (req, res) => {
    try {
        res.status(200).json({message: `User profile retrieved`, data: req.admin, token: req.token});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.logout = async (req, res) => {
    try {
        req.admin.devices.filter(device => device.token !== req.admin.token);
        await req.admin.save();
        res.status(200).json({message: `User profile retrieved`});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.logoutAll = async (req, res) => {
    try {
        req.admin.devices = [];
        await admin.save();
        res.status(200).json({message: `User profile retrieved`});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.changePassword = async (req, res) => {
    try {
        const {currentPassword, password} = req.body;
        if (!currentPassword || !password)
            return res.status(400).json({message: 'Missing required fields', data: null});
        if (!validator.isStrongPassword(password))
            return res.status(400).json({message: 'Weak Password', data: null});
        const matchPassword = await bcrypt.compare(currentPassword, req.user.password);
        if (!matchPassword)
            return res.status(401).json({message: 'Auth Failed'});
        req.user['password'] = await bcrypt.hash(password, 10);
        await req.user.save();
        res.status(200).json({message: `Password changed successfully`, data: req.user});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;
        const admin = await Admin.findOne({email});
        if (!admin)
            return res.status(404).json({message: `No account associated with email ${email}`});
        const token = jwt.sign({_id: admin._id.toString()}, process.env.JWT_SECRET, null, null);
        admin.authInfo.token = token;
        const url = `https://susuplus.vercel.app/auth/reset-password/${token}`;
        const message = `Reset your password using the link ${url}`;
        await admin.save();
        await sendEmail(email, 'RESET PASSWORD', message);
        res.status(200).json({message: `Reset link has been sent to email ${email}`, data: null});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.verifyAccount = async (req, res) => {
    try {
        const {token} = req.params;
        const {otp} = req.body;
        const admin = await Admin.findOne({token});
        if (!admin)
            return res.status(401).json({data: null, message: `Invalid token`});
        if (moment().isAfter(admin.otpValidUntil)) {
            return res.status(401).json({message: `OTP has expired. Please request a new one`, data: null});
        }
        if (admin.authInfo.otp !== otp) {
            return res.status(400).json({message: `OTP incorrect`, data: null});
        }
        admin.status = 'active';
        admin.authInfo.otp = undefined;
        admin.authInfo.otpValidUntil = undefined;
        admin.authInfo.token = undefined;
        await admin.save();
        res.status(200).json({message: `Account verified successfully`, data: null});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        console.log(req.admin, req.body)
        const allowedUpdates = ['name', 'email', 'phone', 'emergencyPhoneNumber', 'username'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed)
            return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates) {
            if (key === 'email') {
                if (req.admin.email !== req.body['email']) {
                    const user = await Admin.findOne({email: req.body['email']});
                    if (!user) {
                        req.admin['email'] = req.body['email'];
                    } else
                        return res.status(409).json({message: `Email already taken`});
                } else {
                    continue;
                }

            } else if (key === 'phone') {
                if (req.admin.phone !== req.body['phone']) {
                    const user = await Admin.findOne({phone: req.body['phone']});
                    if (!user)
                        req.admin['phone'] = req.body['phone'];
                    else
                        return res.status(409).json({message: `Phone number already taken`});
                } else {
                    continue;
                }

            } else if (key === 'username') {
                if (req.admin.username !== req.body['username']) {
                    const user = await Admin.findOne({username: req.body['username']});
                    if (!user)
                        req.admin['username'] = req.body['username'];
                    else
                        return res.status(409).json({message: `Username already taken`});
                } else {
                    continue;
                }

            }
            req.admin[key] = req.body[key];
        }
        await req.admin.save();
        res.status(200).json({data: req.admin, message: 'Account Successfully Updated'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.resendOTP = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await Admin.findOne({email});
        if (!user)
            return res.status(404).json({message: `No account associated with ${email}`, data: null});
        const otp = generateOTP(process.env.OTP_LENGTH, {
            digits: true, alphabets: false, specialChars: false, upperCase: false
        });
        const otpValidUntil = moment().add(30, 'days');
        const token = await jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '30days'}, null);
        user.authInfo.token = token;
        user.otp = otp;
        user.otpValidUntil = otpValidUntil;
        const url = `https://susuplus.vercel.app/auth/verify/${token}`;
        const message = `Click on the link ${url} and verify your email with the otp ${otp}`;
        await user.save();
        await sendEmail(email, 'VERIFY ACCOUNT WITH SUSU PLUS', message);
        res.status(200).json({message: `Verify your account with the link sent to email ${email}`, data: null});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.deactivateProfile = async (req, res) => {
    try {
        req.user.status = 'deactivated';
        req.user.deactivate.reason = req.body.reason;
        req.user.deactivate.date = Date.now();
        await req.user.save();
        res.status(200).json({
            message: `Account Deactivated. We're sorry to see you go. We hope you come back again`,
            data: null
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;
        const admin = await Admin.findOne({'authInfo.token': token});
        if (!admin)
            return res.status(401).json({data: null, message: `Invalid token`});
        if (!validator.isStrongPassword(password))
            return res.status(400).json({message: 'Enter a strong password', data: null});
        admin.password = await bcrypt.hash(password, 10);
        await admin.save();
        res.status(200).json({message: `Password reset successfully`, data: null});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
