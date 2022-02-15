const Client = require("./../../../models/v1/client");

exports.createClient = async (req, res) => {
    try {
        const {create} = req.admin.permissions.clients;
        if (!create) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const {logo, name} = req.body;
        if (!logo || !name) return res.status(400).json({message: 'Missing required fields'});
        const client = await Client.create({logo, name});
        res.status(201).json({message: 'Client created successfully', data: client});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getClients = async (req, res) => {
    try {
        const {read} = req.admin.permissions.clients;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        const clients = await Client.find(match).skip(skip).limit(limit).sort({createdAt: -1});
        const totalClients = await Client.find(match).countDocuments();
        res.status(200).json({message: 'Clients retrieved successfully', data: clients, count: totalClients});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getClient = async (req, res) => {
    try {
        const {read} = req.admin.permissions.clients;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const client = await Client.findById(req.params.id);
        if(!client) return res.status(404).json({message: 'Client not found'});
        res.status(200).json({message: 'Client retrieved successfully', data: client});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateClient = async (req, res) => {
    try {
        const {update} = req.admin.permissions.clients;
        if (!update) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const client = await Client.findById(req.params.id);
        if(!client) return res.status(404).json({message: 'Client not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'logo'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if(!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates){
            client[key] = req.body[key];
        }
        await client.save();
        res.status(200).json({message: 'Client updated successfully', data: client});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteClient = async (req, res) => {
    try {
        const {remove} = req.admin.permissions.clients;
        if (!remove) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const client = await Client.findById(req.params.id);
        if(!client) return res.status(404).json({message: 'Client not found'});
        await client.remove();
        res.status(200).json({message: 'Client deleted successfully', data: client});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
