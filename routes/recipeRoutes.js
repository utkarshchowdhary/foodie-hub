const express = require('express');

const recipeSchema = require('../schemas/recipeSchema');
const { verifyToken, isChef } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validateRequest');
const { getRecipes, createRecipe } = require('../controllers/recipeController');

const router = express.Router();

// Route to retrieve a list of recipes
router.get('/', getRecipes);

// Recipe creation route
router.post('/', verifyToken, isChef, validateRequest(recipeSchema), createRecipe);

module.exports = router;
