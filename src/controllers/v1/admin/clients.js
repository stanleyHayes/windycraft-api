exports.createClient = async (req, res) => {
    try {
        res.status(201).json({message: 'Client created successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getClients = async (req, res) => {
    try {
        res.status(200).json({message: 'Clients retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getClient = async (req, res) => {
    try {
        res.status(200).json({message: 'Client retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateClient = async (req, res) => {
    try {
        res.status(200).json({message: 'Client updated successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteClient = async (req, res) => {
    try {
        res.status(200).json({message: 'Client deleted successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
