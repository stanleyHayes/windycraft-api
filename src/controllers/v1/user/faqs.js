exports.getFAQs = async (req, res) => {
    try {
        res.status(200).json({message: 'FAQs retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
