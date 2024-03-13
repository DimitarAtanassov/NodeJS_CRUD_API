// Auth.js
/* User Authentication Middleware using JSON Web Token (JWT) */

// Imports
//===============================================================
const jwt = require('jsonwebtoken');

/*
    Verfies JWT included in the request header
*/
const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;  // Gets the authorization header from the incoming request

    if (!tokenHeader) {
        return res.status(403).json({ message: "No JWT found!" });
    }

    // Token is in this format: Bearer XXXXXXX we need to trim 'Bearer'
    const token = tokenHeader.split(' ')[1].trim();
    
    // Verify jwt using a secret key, decodes JWT using secret key, if decode is succesful we store the decoded userId so our protected calls can access the userID
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err.message);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // If verification succeeds, attach the decoded user ID to the request object
        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;
