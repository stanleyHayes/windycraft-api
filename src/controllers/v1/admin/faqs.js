const FAQ = require("./../../../models/v1/faq");

exports.createFAQ = async (req, res) => {
    try {
        const {create} = req.admin.permissions.faqs;
        if (!create) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const {question, answer} = req.body;
        const faq = await FAQ.create({question, answer});
        res.status(201).json({message: 'FAQ created successfully', data: faq});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getFAQs = async (req, res) => {
    try {
        const {read} = req.admin.permissions.faqs;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        const faqs = await FAQ.find(match).skip(skip).limit(limit).sort({createdAt: -1});
        const totalFAQs = await FAQ.find(match).countDocuments();
        res.status(200).json({message: 'FAQs retrieved successfully', count: totalFAQs, data: faqs});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getFAQ = async (req, res) => {
    try {
        const {read} = req.admin.permissions.faqs;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const faq = await FAQ.findById(req.params.id);
        if (!faq) return res.status(404).json({message: 'FAQ not found'});
        res.status(200).json({message: 'FAQ retrieved successfully', data: faq});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateFAQ = async (req, res) => {
    try {
        const {update} = req.admin.permissions.faqs;
        if (!update) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const faq = await FAQ.findById(req.params.id);
        if (!faq) return res.status(404).json({message: 'FAQ not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['question', 'answer'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates) {
            faq[key] = req.body[key];
        }
        await faq.save();
        res.status(200).json({message: 'FAQ updated successfully', data: faq});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteFAQ = async (req, res) => {
    try {
        const {remove} = req.admin.permissions.faqs;
        if (!remove) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const faq = await FAQ.findById(req.params.id);
        if (!faq) return res.status(404).json({message: 'FAQ not found'});
        await faq.remove();
        res.status(200).json({message: 'FAQ deleted successfully', data: faq});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
