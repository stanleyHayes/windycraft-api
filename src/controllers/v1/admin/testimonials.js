const Testimonial = require("./../../../models/v1/testimonial");

exports.createTestimonial = async (req, res) => {
    try {
        const {create} = req.admin.permissions.testimonials;
        if (!create) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const {rating, review, firstName, lastName} = req.body;
        if (!rating || !review || !firstName || !lastName) return res.status(400).json({message: 'Missing required fields'});
        if (rating < 0 || rating > 5) return res.status(400).json({message: 'Rating should be between 0 and 5'});
        const testimonial = await Testimonial.create({rating, review, firstName, lastName});
        res.status(201).json({message: 'Testimonial created successfully', data: testimonial});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getTestimonials = async (req, res) => {
    try {
        const {read} = req.admin.permissions.testimonials;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        if (req.query.approved) {
            match['approved'] = Boolean(req.query.approved);
        }
        const testimonials = await Testimonial.find(match).skip(skip).limit(limit).sort({createdAt: -1});
        const totalTestimonials = await Testimonial.find(match).countDocuments();
        res.status(200).json({message: 'Testimonials retrieved successfully', data: testimonials, count: totalTestimonials});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getTestimonial = async (req, res) => {
    try {
        const {read} = req.admin.permissions.testimonials;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const testimonial = await Testimonial.findById(req.params.id);
        if(!testimonial) return res.status(404).json({message: 'Testimonial not found'});
        res.status(200).json({message: 'Testimonial retrieved successfully', data: testimonial});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateTestimonial = async (req, res) => {
    try {
        const {update} = req.admin.permissions.testimonials;
        if (!update) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const testimonial = await Testimonial.findById(req.params.id);
        if(!testimonial) return res.status(404).json({message: 'Testimonial not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['review', 'rating', 'name'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if(!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates){
            if(key === 'rating'){
                if (req.body['rating'] < 0 ||req.body['rating'] > 5) return res.status(400).json({message: 'Rating should be between 0 and 5'});
            }
            testimonial[key] = req.body[key];
        }
        await testimonial.save();
        res.status(200).json({message: 'Testimonial updated successfully', data: testimonial});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.approveTestimonial = async (req, res) => {
    try {
        const {approve} = req.admin.permissions.testimonials;
        if (!approve) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const testimonial = await Testimonial.findById(req.params.id);
        if(!testimonial) return res.status(404).json({message: 'Testimonial not found'});
        if(testimonial.approved) return res.status(400).json({message: 'Testimonial already approved'});
        testimonial.approved = true;
        await testimonial.save();
        res.status(200).json({message: 'Testimonial approved successfully', data: testimonial});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.refuseTestimonial = async (req, res) => {
    try {
        const {refuse} = req.admin.permissions.testimonials;
        if (!refuse) return res.status(401).json({message: 'You do not have the permission to perform this operation'});

        const testimonial = await Testimonial.findById(req.params.id);
        if(!testimonial) return res.status(404).json({message: 'Testimonial not found'});
        if(!testimonial.approved) return res.status(400).json({message: 'Testimonial already refused'});
        testimonial.approved = false;
        await testimonial.save();
        res.status(200).json({message: 'Testimonial refused successfully', data: testimonial});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteTestimonial = async (req, res) => {
    try {
        const {remove} = req.admin.permissions.testimonials;
        if (!remove) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const testimonial = await Testimonial.findById(req.params.id);
        if(!testimonial) return res.status(404).json({message: 'Testimonial not found'});
        await testimonial.remove();
        res.status(200).json({message: 'Testimonial deleted successfully', data: testimonial});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
