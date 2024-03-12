const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const tokenHeader  = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(403).json({ message: "No JWT found!" });
    }
    const token = tokenHeader.split(' ')[1].trim();
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err.message);
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const userId = decoded.userId;

        // Compare userId with expected value (e.g., user ID from database)
        if (userId !== expectedUserId) {
            console.error('Invalid userId:', userId);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // If userId matches, proceed to the next middleware or route handler
        req.userId = userId;
        next();
    });
};

module.exports = verifyToken;
