const db = require('../config/db');
const { hashPassword, signToken, comparePasswords } = require('../utils/authHelper');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // The default role is 'user'. The 'chef' role must be configured in the database.
    const role = 'user';

    try {
        // Hash the password
        const hashedPassword = await hashPassword(password);

        const [{ insertId: userId }] = await db.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        // Generate JWT token
        const token = signToken({
            id: userId,
            username: username,
            role
        });

        res.status(201).json({ status: 'success', token });
    } catch (error) {
        console.error('User registration failed.', error);

        // Handle duplicate username or email error
        if (error.code === 'ER_DUP_ENTRY') {
            const field = error.sqlMessage.includes('username') ? 'username' : 'email';
            return res.status(400).json({
                status: 'error',
                message: `The ${field} is already in use.`
            });
        }

        res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const [[user] = []] = await db.execute(
            'SELECT id, username, role, password FROM users WHERE email = ?',
            [email]
        );

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare password with hashed password
        const isMatch = await comparePasswords(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = signToken({
            id: user.id,
            username: user.username,
            role: user.role
        });

        res.status(200).json({ status: 'success', token });
    } catch (error) {
        console.error('User login failed.', error);

        res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
};

module.exports = {
    registerUser,
    loginUser
};
