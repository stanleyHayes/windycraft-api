const Invitation = require("./../../../models/v1/invitation");
const validator = require("validator/es");
const moment = require("moment");
const FAQ = require("../../../models/v1/faq");

exports.createInvitation = async (req, res) => {
    try {
        const {create} = req.admin.permissions.invitations;
        if (!create) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const {email} = req.body;
        const existingInvitation = await Invitation.findOne({email, status: {$in: ['pending', 'accepted']}});
        if (existingInvitation) return res.status(400).json({message: 'Invitation already exists'});
        const invitation = await Invitation.create({email, inviter: req.admin._id});
        res.status(201).json({message: 'Invitation created successfully', data: invitation});
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
        const invitations = await Invitation.find(match).skip(skip).limit(limit).sort({createdAt: -1});
        const totalInvitations = Invitation.find(match).countDocuments();

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
        res.status(200).json({message: 'Invitation accepted successfully', data: {}});
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

        res.status(200).json({message: 'Invitation rejected successfully', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateInvitation = async (req, res) => {
    try {
        const {update} = req.admin.permissions.invitations;
        if (!update) return res.status(401).json({message: 'You do not have the permission to perform this operation'});

        res.status(200).json({message: 'Invitation updated successfully', data: {}});
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
