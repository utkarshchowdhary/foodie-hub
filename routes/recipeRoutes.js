const express = require('express');

const recipeSchema = require('../schemas/recipeSchema');
const { verifyToken, isChef } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validateRequest');
const { getRecipes, getRecipe, createRecipe } = require('../controllers/recipeController');

const router = express.Router();

// Route to retrieve a list of recipes
router.get('/', getRecipes);

// Route for getting a recipe by ID
router.get('/:id', getRecipe);

// Recipe creation route
router.post('/', verifyToken, isChef, validateRequest(recipeSchema), createRecipe);

module.exports = router;
