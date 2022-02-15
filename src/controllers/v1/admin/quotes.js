const Quote = require("../../../models/v1/quote");

exports.getQuotes = async (req, res) => {
    try {
        const {create} = req.admin.permissions.quotes;
        if (!create) return res.status(401).json({message: 'You do not have the permission to perform this operation'});

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        if (req.query.responded) {
            match['responded'] = Boolean(req.query.responded);
        }
        const quotes = await Quote.find(match).skip(skip).limit(limit).sort({createdAt: -1});
        const totalQuotes = await Quote.find(match).countDocuments();
        res.status(200).json({message: 'Quotes retrieved successfully', data: quotes, count: totalQuotes});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getQuote = async (req, res) => {
    try {
        const {read} = req.admin.permissions.quotes;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({message: 'Quote not found'});
        res.status(200).json({message: 'Quote retrieved successfully', data: quote});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateQuote = async (req, res) => {
    try {
        const {update} = req.admin.permissions.quotes;
        if (!update) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({message: 'Quote not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['responded'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates) {
            if(key === 'responded'){
                quote['responded'] = !Boolean(quote['responded']);
                continue;
            }
            quote[key] = req.body[key];
        }
        await quote.save();
        res.status(200).json({message: 'Quote updated successfully', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteQuote = async (req, res) => {
    try {
        const {remove} = req.admin.permissions.quotes;
        if (!remove) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({message: 'Quote not found'});
        if(!quote.responded) return res.status({message: 'Quote has not been'});
        await quote.remove();
        res.status(200).json({message: 'Quote deleted successfully', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.replyQuote = async (req, res) => {
    try {
        const {reply} = req.admin.permissions.quotes;
        if (!reply) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({message: 'Quote not found'});
        const {response} = req.body;
        // send response as sms to user
        // send response as email to user
        quote.response = response;
        quote.responded = true;
        await quote.save();
        res.status(200).json({message: 'Quote responded to successfully', data: quote});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
