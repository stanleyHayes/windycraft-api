exports.createService = async (req, res) => {
    try {
        res.status(201).json({message: 'Service created successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getServices = async (req, res) => {
    try {
        res.status(200).json({message: 'Services retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getService = async (req, res) => {
    try {
        res.status(200).json({message: 'Service retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateService = async (req, res) => {
    try {
        res.status(200).json({message: 'Service updated successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteService = async (req, res) => {
    try {
        res.status(200).json({message: 'Service deleted successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
