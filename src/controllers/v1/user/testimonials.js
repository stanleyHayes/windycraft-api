const Testimonial = require("./../../../models/v1/testimonial");

exports.createTestimonial = async (req, res) => {
    try {
        const {rating, review, firstName, lastName} = req.body;
        if (!rating || !review || !firstName || !lastName)
            return res.status(400).json({message: 'Missing required fields'});
        if (rating < 0 || rating > 5)
            return res.status(400).json({message: 'Rating should be between 0 and 5'});
        await Testimonial.create({rating, review, firstName, lastName});
        // send email to both sender and receiver
        // send text message to both sender and receiver
        res.status(201).json({message: 'Thank you for leaving a review.'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = Testimonial.find({approved: true});
        res.status(200).json({data: testimonials});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
