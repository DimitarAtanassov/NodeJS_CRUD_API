const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: "No JWT found!" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;
