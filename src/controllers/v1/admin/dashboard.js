exports.getDashboard = async (req, res) => {
    try {
        res.status(200).json({message: 'Dashboard retrieved successfully'});
    }catch (e) {
        res.status(500).json({message: 'Dashboard retrieved successfully'});
    }
}
