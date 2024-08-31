const express = require('express');

const userSchema = require('../schemas/userSchema');
const { validateRequest } = require('../middlewares/validateRequest');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// User registration route
router.post('/register', validateRequest(userSchema), registerUser);

// User login route
router.post('/login', validateRequest(userSchema.pick({ email: true, password: true })), loginUser);

module.exports = router;
