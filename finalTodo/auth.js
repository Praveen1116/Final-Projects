const jwt = require("jsonwebtoken");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(403).json({
            message: "Something went wrong"
        });
    }

    try {
        const tokenPart = token.split(" ")[1] || token;
        const decodeData = jwt.verify(tokenPart, JWT_SECRET);
        req.userId = decodeData.id;
        next();
    } catch(err) {
        res.status(403).json({
            message: "Invalid credentials"
        });
    }
}

module.exports = {
    auth
};