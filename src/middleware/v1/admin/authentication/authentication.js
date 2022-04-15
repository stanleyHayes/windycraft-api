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
        const admin = await Admin.findById(data._id);
        if(!admin)
            return res.status(401).json({message: 'Admin not found'});
        req.admin = admin;
        next();
    }catch (e) {
        return res.status(500).json({message: e.message});
    }
}

module.exports = {authenticate};
