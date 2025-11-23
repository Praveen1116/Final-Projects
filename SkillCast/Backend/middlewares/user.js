const jwt = require('jsonwebtoken');
const { JWT_USER_SECRET }  = require('../config');

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if(!token) {
        res.status(403).json({
            message: "Something went wrong"
        });
        return;
    }

    try{
        const tokenPart = token.split(" ")[1] || token;
        const decodedData = jwt.verify(tokenPart, JWT_USER_SECRET);
        req.userId = decodedData.id;
        next();
    } catch (err) {
        res.status(403).json({
            message: "Invalid credentials"
        });
    }
}

module.exports = {
    userMiddleware: userMiddleware
}