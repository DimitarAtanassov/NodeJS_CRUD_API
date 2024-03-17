const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
/*
    Verifies JWT included in the request header
*/
const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization; // Gets the authorization header from the incoming request

    if (!tokenHeader) {
        return res.status(403).json({ message: "No JWT found!" });
    }

    // Token is in this format: Bearer XXXXXXX we need to split and extract the token part
    const tokenParts = tokenHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = tokenParts[1];

    // Verify JWT using a secret key
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            } else {
                console.error('Error verifying token:', err.message);
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }

        // If verification succeeds, attach the decoded user ID to the request object
        req.userId = new mongoose.Types.ObjectId(decoded.userId);
        next();
    });
};

/*
    Middleware to refresh JWT token
    This middleware should be called after verifyToken middleware
*/
const refreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Error verifying refresh token:', err.message);
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Generate a new access token
        const accessToken = generateAccessToken(decoded.userId);
        res.json({ accessToken });
    });
};

module.exports = { verifyToken, refreshToken };
