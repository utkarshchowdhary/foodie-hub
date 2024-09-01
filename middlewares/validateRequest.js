// Middleware function to validate request body
const validateRequest = schema => (req, res, next) => {
    const { success, data, error } = schema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ status: 'error', error: error.errors });
    }

    req.body = data;
    next();
};

module.exports = {
    validateRequest
};
