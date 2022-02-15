const TeamMember = require("./../../../models/v1/team-member");
const FAQ = require("../../../models/v1/faq");

exports.createTeamMember = async (req, res) => {
    try {
        const {create} = req.admin.permissions.teams;
        if (!create) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const {image, role, name, twitter, facebook, instagram, linkedin} = req.body;
        if (!image || !role || !name) return res.status(400).json({message: 'Missing required fields'});
        const teamMember = await TeamMember.create({
            image,
            role,
            name,
            socialMediaAccounts: {twitter, facebook, instagram, linkedin}
        });
        res.status(201).json({message: 'Team created successfully', data: teamMember});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getTeamMembers = async (req, res) => {
    try {
        const {read} = req.admin.permissions.teams;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        const teamMembers = await TeamMember.find(match).skip(skip).limit(limit).sort({createdAt: -1});
        const totalTeamMembers = await TeamMember.find(match).countDocuments();
        res.status(200).json({message: 'Teams retrieved successfully', data: teamMembers, count: totalTeamMembers});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getTeamMember = async (req, res) => {
    try {
        const {read} = req.admin.permissions.teams;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const teamMember = await TeamMember.findById(req.params.id);
        if (!teamMember) return res.status(404).json({message: 'Team member not found'});
        res.status(200).json({message: 'Team retrieved successfully', data: teamMember});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateTeamMember = async (req, res) => {
    try {
        const {update} = req.admin.permissions.teams;
        if (!update) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const teamMember = await TeamMember.findById(req.params.id);
        if (!teamMember) return res.status(404).json({message: 'Team member not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['role', 'image', 'name', 'facebook', 'instagram', 'twitter', 'linkedin'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates) {
            if (key === 'facebook') {
                teamMember.socialMediaAccount = {
                    facebook: req.body[key]
                };
                continue;
            } else if (key === 'instagram') {
                teamMember.socialMediaAccount = {
                    instagram: req.body[key]
                };
                continue;
            } else if (key === 'twitter') {
                teamMember.socialMediaAccount = {
                    twitter: req.body[key]
                };
                continue;
            } else if (key === 'linkedin') {
                teamMember.socialMediaAccount = {
                    linkedin: req.body[key]
                };
                continue;
            }
            teamMember[key] = req.body[key];
        }
        await teamMember.save();
        res.status(200).json({message: 'Team updated successfully', data: teamMember});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteTeamMember = async (req, res) => {
    try {
        const {remove} = req.admin.permissions.teams;
        if (!remove) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const teamMember = await TeamMember.findById(req.params.id);
        if (!teamMember) return res.status(404).json({message: 'Team member not found'});
        await teamMember.remove();
        res.status(200).json({message: 'Team member deleted successfully', data: teamMember});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
