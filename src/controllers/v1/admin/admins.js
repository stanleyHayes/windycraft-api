exports.createAdmin = async (req, res) => {
    try {
        res.status(201).json({message: 'Admin created successfully', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getAdmins = async (req, res) => {
    try {
        res.status(200).json({message: 'Admins retrieved successfully', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getAdmin = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin retrieved successfully', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateAdmin = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin updated successfully', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteAdmin = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin deleted successfully', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
