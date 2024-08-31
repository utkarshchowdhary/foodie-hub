require('dotenv').config();
const express = require('express');

const initDb = require('./config/initDb');

const app = express();

(async () => {
    try {
        // Initialize the database schema
        await initDb();

        // Setup middlewares and routes
        app.use(express.json());

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize the database. Exiting application.', error);
        process.exit(1);
    }
})();
