const express = require('express');

const recipeSchema = require('../schemas/recipeSchema');
const { validateRequest } = require('../middlewares/validateRequest');
const { getRecipes } = require('../controllers/recipeController');

const router = express.Router();

// Route to retrieve a list of recipes
router.get('/', getRecipes);

// Recipe creation route
router.post('/', validateRequest(recipeSchema), (req, res) => {
    res.status(201).json({ status: 'success', message: 'Recipe created' });
});

module.exports = router;
