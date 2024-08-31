const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async plainPassword => {
    return bcrypt.hash(plainPassword, 10);
};

const comparePasswords = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

const signToken = payload => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

module.exports = { signToken, hashPassword, comparePasswords };
