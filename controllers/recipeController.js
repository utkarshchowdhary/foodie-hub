const db = require('../config/db');

const createRecipe = async (req, res) => {
    res.status(201).json({ status: 'success' });
};

const getRecipes = async (req, res) => {
    try {
        const [recipes] = await db.execute('SELECT * FROM recipes WHERE draft = FALSE');

        res.status(200).json({ status: 'success', data: recipes });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = {
    createRecipe,
    getRecipes
};
