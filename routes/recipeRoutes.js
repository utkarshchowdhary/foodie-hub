const express = require('express');

const recipeSchema = require('../schemas/recipeSchema');
const { verifyToken, isChef } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validateRequest');
const { createRecipe, getRecipes } = require('../controllers/recipeController');

const router = express.Router();

// Recipe creation route
router.post('/', verifyToken, isChef, validateRequest(recipeSchema), createRecipe);

// Route to retrieve a list of recipes
router.get('/', getRecipes);

module.exports = router;
