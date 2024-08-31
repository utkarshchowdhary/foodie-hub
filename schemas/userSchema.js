const { z } = require('zod');

const userSchema = z.object({
    username: z.string().trim().min(3).max(255),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().trim().min(6)
});

module.exports = userSchema;
