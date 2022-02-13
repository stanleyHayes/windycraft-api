exports.getQuotes = async (req, res) => {
    try {
        res.status(200).json({message: 'Quotes retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getQuote = async (req, res) => {
    try {
        res.status(200).json({message: 'Quote retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateQuote = async (req, res) => {
    try {
        res.status(200).json({message: 'Quote updated successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteQuote = async (req, res) => {
    try {
        res.status(200).json({message: 'Quote deleted successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
