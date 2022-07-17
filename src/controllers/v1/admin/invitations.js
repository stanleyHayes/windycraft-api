const Invitation = require("./../../../models/v1/invitation");
const moment = require("moment");
const Admin = require("../../../models/v1/admin");
const {generateOTP} = require("./../../../utils/otp-generator");
const {sendEmail} = require("./../../../utils/emails");
const bcrypt = require("bcryptjs");

exports.createInvitation = async (req, res) => {
    try {
        const {create} = req.admin.permissions.invitations;
        if (!create) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const {email} = req.body;
        const existingInvitation = await Invitation.findOne({email, status: {$in: ['pending', 'accepted']}});
        if (existingInvitation) return res.status(400).json({message: 'Invitation already exists'});
        const expiryDate = moment().add(30, 'days');
        const otp = generateOTP(
            process.env.OTP_LENGTH_KEY,
            {digits: true, alphabets: false, upperCase: false, specialChars: false}
        )
        const invitation = await Invitation.create({email, inviter: req.admin._id, expiryDate, code: otp});
        const subject = `Admin Invitation`;
        const link = `https://supercraftadmin.vercel.app/invitations/${invitation._id}/${otp}`;
        const message = `You have been invited by ${req.admin.name} of Super Craft GH sign up to be an admin. Follow the link ${link} to setup your account. Your otp is ${otp}`;
        await sendEmail(email, subject, message);
        invitation.code = otp;
        await invitation.save();
        const populatedInvitation = await Invitation
            .findById(invitation._id).populate({path: 'inviter', select: 'name'});
        res.status(201).json({message: 'Invitation created successfully', data: populatedInvitation});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getInvitations = async (req, res) => {
    try {
        const {read} = req.admin.permissions.invitations;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        const invitations = await Invitation.find(match).populate({path: 'inviter', select: 'name'}).skip(skip).limit(limit).sort({createdAt: -1});
        const totalInvitations = await Invitation.find(match).countDocuments();
        res.status(200).json({
            message: `${totalInvitations} invitations retrieved successfully`,
            data: invitations,
            count: totalInvitations
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getInvitation = async (req, res) => {
    try {
        const {read} = req.admin.permissions.invitations;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const invitation = await Invitation.findById(req.params.id);
        if (!invitation) return res.status(404).json({message: 'Invitation not found'});
        res.status(200).json({message: 'Invitation retrieved successfully', data: invitation});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.acceptInvitation = async (req, res) => {
    try {
        const invitation = await Invitation.findOne({_id: req.params.id});
        if (!invitation) return res.status(404).json({message: 'Invitation not found'});
        if (moment().isAfter(invitation.expiryDate)) {
            invitation.status = 'expired';
            return res.status(400).json({message: 'Invitation has expired'});
        }
        if(invitation.status === 'rejected')
            return res.status(400).json({message: 'Invitation rejected'});
        const {email, name, image, password, code, username, emergencyPhoneNumber, phone} = req.body;
        if (email !== invitation.email) return res.status(400).json({message: 'Use the email you were invited with.'});
        if (code !== invitation.code) return res.status(400).json({message: 'Invalid code'});
        const existingAdmin = await Admin.findOne({email});
        if (existingAdmin) return res.status(409).json({message: 'Email already taken'});
        const admin = await Admin.create({
            name,
            image,
            email,
            password: await bcrypt.hash(password, 10),
            status: 'active',
            username,
            emergencyPhoneNumber,
            phone
        });
        invitation.invitee = admin._id;
        invitation.status = 'accepted';
        await invitation.save();
        res.status(200).json({message: 'Invitation accepted successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.revokeInvitation = async (req, res) => {
    try {
        const {revoke} = req.admin.permissions.invitations;
        if (!revoke) return res.status(401).json({message: 'You do not have the permission to perform this operation'});

        res.status(200).json({message: 'Invitation revoked successfully', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.rejectInvitation = async (req, res) => {
    try {
        const invitation = await Invitation.findById(req.params.id);
        if (!invitation) return res.status(404).json({message: 'Invitation not found'});
        if (moment().isAfter(invitation.startDate)) {
            invitation.status = 'expired';
            return res.status(400).json({message: 'Invitation has expired'});
        }
        if (invitation.status === 'accepted')
            return res.status(400).json({message: 'Invitation already accepted'});
        invitation.status = 'rejected';
        await invitation.save();
        res.status(200).json({message: 'Invitation rejected successfully', data: invitation});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateInvitation = async (req, res) => {
    try {
        const {update} = req.admin.permissions.invitations;
        if (!update) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const invitation = await Invitation.findById(req.params.id);
        if (!invitation) return res.status(404).json({message: 'Invitation not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['expiryDate'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates) {
            if (key === 'expiryDate') {
                if (moment().isSameOrAfter(req.body['expiryDate'])) {
                    invitation.status = 'expired';
                    invitation.expiryDate = req.body['expiryDate'];
                } else if (moment().isBefore(req.body['expiryDate'])) {
                    invitation.status = 'pending';
                    invitation.expiryDate = req.body['expiryDate'];
                }
                continue;
            }
            invitation[key] = req.body[key];
        }
        await invitation.save();
        res.status(200).json({message: 'Invitation updated successfully', data: invitation});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteInvitation = async (req, res) => {
    try {
        const {remove} = req.admin.permissions.invitations;
        if (!remove) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const invitation = await Invitation.findById(req.params.id);
        if (!invitation) return res.status(404).json({message: 'Invitation not found'});
        await invitation.remove();
        res.status(200).json({message: 'Invitation deleted successfully', data: invitation});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
