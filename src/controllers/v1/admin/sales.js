exports.createSale = async (req, res) => {
    try {
        res.status(201).json({message: 'Sale created successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getSales = async (req, res) => {
    try {
        res.status(200).json({message: 'Sales retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getSale = async (req, res) => {
    try {
        res.status(200).json({message: 'Sale retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateSale = async (req, res) => {
    try {
        res.status(200).json({message: 'Sale updated successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}



exports.deleteSale = async (req, res) => {
    try {
        res.status(200).json({message: 'Sale deleted successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
