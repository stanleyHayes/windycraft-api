const FAQ = require("./../../../models/v1/faq");

exports.getFAQs = async (req, res) => {
    try {
        const FAQs = await FAQ.find({});
        res.status(200).json({data: FAQs});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
