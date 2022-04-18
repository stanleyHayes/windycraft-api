const jwt = require("jsonwebtoken");

const Admin = require("../../../../models/v1/admin");

const authenticate = async (req, res, next) => {
    try {
        if(!req.headers || !req.headers['authorization'])
            return res.status(400).json({message: 'Invalid header format'});
        const [bearer, token] = req.headers['authorization'].split(' ');
        if(!bearer || !token)
            return res.status(400).json({message: 'Invalid header format: Token required'});
        const data = jwt.verify(token, process.env.JWT_SECRET, null, null);
        const admin = await Admin.findOne({_id: data._id, "devices.token": token});
        if(!admin)
            return res.status(403).json({message: 'Session Expired'});
        req.admin = admin;
        next();
    }catch (e) {
        return res.status(500).json({message: e.message});
    }
}

module.exports = {authenticate};
