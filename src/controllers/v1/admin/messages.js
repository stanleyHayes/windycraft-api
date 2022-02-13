exports.createMessage = async (req, res) => {
    try {
        res.status(201).json({message: 'Message created successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getMessages = async (req, res) => {
    try {
        res.status(200).json({message: 'Messages retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getMessage = async (req, res) => {
    try {
        res.status(200).json({message: 'Message retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateMessage = async (req, res) => {
    try {
        res.status(200).json({message: 'Message updated successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteMessage = async (req, res) => {
    try {
        res.status(200).json({message: 'Message deleted successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
