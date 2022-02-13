exports.createFAQ = async (req, res) => {
    try {
        res.status(201).json({message: 'FAQ created successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getFAQs = async (req, res) => {
    try {
        res.status(200).json({message: 'FAQs retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getFAQ = async (req, res) => {
    try {
        res.status(200).json({message: 'FAQ retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateFAQ = async (req, res) => {
    try {
        res.status(200).json({message: 'FAQ updated successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteFAQ = async (req, res) => {
    try {
        res.status(200).json({message: 'FAQ deleted successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
