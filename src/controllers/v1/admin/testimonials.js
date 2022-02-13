exports.createTestimonial = async (req, res) => {
    try {
        res.status(201).json({message: 'Testimonial created successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getTestimonials = async (req, res) => {
    try {
        res.status(200).json({message: 'Testimonials retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getTestimonial = async (req, res) => {
    try {
        res.status(200).json({message: 'Testimonial retrieved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateTestimonial = async (req, res) => {
    try {
        res.status(200).json({message: 'Testimonial updated successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.approveTestimonial = async (req, res) => {
    try {
        res.status(200).json({message: 'Testimonial approved successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.refuseTestimonial = async (req, res) => {
    try {
        res.status(200).json({message: 'Testimonial refused successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteTestimonial = async (req, res) => {
    try {
        res.status(200).json({message: 'Testimonial deleted successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
