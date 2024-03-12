const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'No JWT found!' });
    }

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
