const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(403).json({ message: "No JWT found!" });
    }

    const token = tokenHeader.split(' ')[1].trim();
    
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
