const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ status: 'success', message: 'Authentication failed' });
    }

    // Verify the token using the JWT secret
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({ status: 'error', message: 'Authentication failed' });
        }

        req.userData = decoded;
        next();
    });
};

const isChef = (req, res, next) => {
    if (req.userData?.role !== 'chef') {
        return res.status(403).json({ status: 'error', message: 'Access denied' });
    }

    next();
};

module.exports = {
    verifyToken,
    isChef
};
