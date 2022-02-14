const Service = require("./../../../models/v1/service");

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.status(200).json({data: services});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
