exports.getTeamMembers = async (req, res) => {
    try {
        res.status(200).json({message: 'Team Members retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
