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
