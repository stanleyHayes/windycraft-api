const Service = require("./../../../models/v1/service");

exports.createService = async (req, res) => {
    try {
        const {create} = req.admin.permissions.services;
        if (!create) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const {title} = req.body;
        const service = await Service.create({title});
        res.status(201).json({message: 'Service created successfully', data: service});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getServices = async (req, res) => {
    try {
        const {read} = req.admin.permissions.services;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        const services = await Service.find(match).skip(skip).limit(limit).sort({createdAt: -1});
        const totalServices = await Service.find(match).countDocuments();
        res.status(200).json({
            message: 'Services retrieved successfully',
            data: services,
            count: totalServices
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getService = async (req, res) => {
    try {
        const {read} = req.admin.permissions.services;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({message: 'Service not found'});
        res.status(200).json({message: 'Service retrieved successfully', data: service});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateService = async (req, res) => {
    try {
        const {update} = req.admin.permissions.services;
        if (!update) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({message: 'Service not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['image', 'title', 'description'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates) {
            service[key] = req.body[key];
        }
        await service.save();
        res.status(200).json({message: 'Service updated successfully', data: service});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteService = async (req, res) => {
    try {
        const {remove} = req.admin.permissions.services;
        if (!remove) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({message: 'Service not found'});
        await service.remove();
        res.status(200).json({message: 'Service deleted successfully', data: service});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
