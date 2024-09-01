const db = require('../config/db');

const getIngredients = async (req, res) => {
    try {
        // Fetch ingredients from the ingredients table
        const [ingredients] = await db.execute('SELECT id, name, description FROM ingredients');

        res.status(200).json({
            status: 'success',
            data: ingredients
        });
    } catch (error) {
        console.error('Error fetching ingredients.', error);

        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

module.exports = { getIngredients };
