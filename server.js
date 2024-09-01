require('dotenv').config();
const express = require('express');

const initDb = require('./config/initDb');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');

const app = express();

// Setup middlewares
app.use(express.json());

// Define routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/recipes', recipeRoutes);
app.use('/api/v1/ingredients', ingredientRoutes);

(async () => {
    try {
        // Initialize the database schema
        await initDb();

        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize the database. Exiting application.', error);
        process.exit(1);
    }
})();
