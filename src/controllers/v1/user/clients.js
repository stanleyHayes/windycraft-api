const Client = require("./../../../models/v1/client");

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find({});
        res.status(200).json({data: clients});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
