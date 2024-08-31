// Middleware function to validate request body
const validateRequest = schema => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ status: 'error', error: error.errors });
    }
};

module.exports = {
    validateRequest
};
