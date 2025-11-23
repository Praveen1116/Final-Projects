const jwt = require('jsonwebtoken');
const { JWT_ADMIN_SECRET}  = require('../config');

function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if(!token) {
        res.status(403).json({
            message: "Something went wrong"
        });
        return;
    }

    try{
        const tokenPart = token.split(" ")[1] || token;
        const decodedData = jwt.verify(tokenPart, JWT_ADMIN_SECRET);
        req.adminId = decodedData.id;
        next();
    } catch (err) {
        res.status(403).json({
            message: "Invalid credentials"
        });
        return;
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}