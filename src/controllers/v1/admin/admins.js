const Admin = require("../../../models/v1/admin");
const bcrypt = require("bcryptjs");

exports.createAdmin = async (req, res) => {
    try {
        const {create} = req.admin.permissions.admins;
        if (!create) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const {name, phone, password, email, emergencyPhoneNumber, image} = req.body;
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin)return res.status(409).json({message: 'Email already taken'});

        const admin = await Admin.create({
            image,
            email,
            name,
            phone,
            emergencyPhoneNumber,
            password: await bcrypt.hash(password, 10)
        });

        res.status(201).json({admin, message: 'Admin created successfully', data: admin});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getAdmins = async (req, res) => {
    try {
        const {read} = req.admin.permissions.admins;
        if (!read) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        const totalAdmins = await Admin.find(match).countDocuments();
        const admins = await Admin.find(match)
            .limit(limit)
            .skip(skip)
            .sort({createdAt: -1});
        res.status(200).json({data: admins, count: totalAdmins, message: 'Admin Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getAdmin = async (req, res) => {
    try {
        const {read} = req.admin.permissions.admins;
        if (!read) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({message: 'Admin not found'});
        res.status(200).json({data: admin, message: 'Admin Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateAdmin = async (req, res) => {
    try {
        const {update} = req.admin.permissions.admin;
        if (!update) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({message: 'Admin not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = [
            'name',
            'phone',
            'image',
            'permissions',
            'emergencyPhoneNumber'
        ];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if(!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates){
            if(key === 'phone'){
                if(admin.phone !== req.body['phone']){
                    const existingAdmin = await Admin.findOne({phoneNumber: req.body['phone']});
                    if(existingAdmin) return res.status(409).json({message: 'Phone number already taken'});
                }else{
                    admin.phone = req.body['phone'];
                }
            }
            admin[key] = req.body[key];
        }
        await admin.save();
        res.status(200).json({data: admin, message: 'Admin Updated Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteAdmin = async (req, res) => {
    try {
        const {delete: remove} = req.admin.permissions.admins;
        if (!remove) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({message: 'Admin not found'});
        admin.status = 'suspended';
        await admin.save();
        res.status(200).json({data: admin, message: 'Admin Deleted Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
