const Value = require("./../../../models/v1/value");

exports.createValue = async (req, res) => {
    try {
        const {create} = req.admin.permissions.values;
        if (!create) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const {title, description} = req.body;
        const createdValue = await Value.create({title, description});
        res.status(201).json({message: 'Value created successfully', data: createdValue});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getValues = async (req, res) => {
    try {
        const {read} = req.admin.permissions.values;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        const values = await Value.find(match).skip(skip).limit(limit).sort({createdAt: -1});
        const totalValues = await Value.find(match).countDocuments();
        res.status(200).json({
            message: 'Values retrieved successfully',
            data: values,
            count: totalValues
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getValue = async (req, res) => {
    try {
        const {read} = req.admin.permissions.values;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const value = await Value.findById(req.params.id);
        if (!value) return res.status(404).json({message: 'Value not found'});
        res.status(200).json({message: 'Value retrieved successfully', data: value});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateValue = async (req, res) => {
    try {
        const {update} = req.admin.permissions.values;
        if (!update) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const value = await Value.findById(req.params.id);
        if (!value) return res.status(404).json({message: 'Value not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'description'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates) {
            value[key] = req.body[key];
        }
        await value.save();
        res.status(200).json({message: 'Value updated successfully', data: value});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteValue = async (req, res) => {
    try {
        const {remove} = req.admin.permissions.values;
        if (!remove) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const value = await Value.findById(req.params.id);
        if (!value) return res.status(404).json({message: 'Value not found'});
        await value.remove();
        res.status(200).json({message: 'Value deleted successfully', data: value});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
