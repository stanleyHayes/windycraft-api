const TeamMember = require("./../../../models/v1/team-member");

exports.getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find({});
        res.status(200).json({data: teamMembers});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
