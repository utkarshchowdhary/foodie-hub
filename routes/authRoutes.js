const express = require('express');

const userSchema = require('../schemas/userSchema');
const { validateRequest } = require('../middlewares/validateRequest');

const router = express.Router();

// User registration route
router.post('/register', validateRequest(userSchema), (req, res) => {
    const { username, email, password } = req.body;
    // Insert user into the database
    res.status(201).json({ status: 'success', message: 'User registered' });
});

module.exports = router;
