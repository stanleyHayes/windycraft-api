exports.createQuote = async (req, res) => {
    try {
        res.status(201).json({message: 'Quote created successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
