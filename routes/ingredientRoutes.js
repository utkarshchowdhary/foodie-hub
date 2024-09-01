const express = require('express');

const { getIngredients } = require('../controllers/ingredientController');

const router = express.Router();

// Route to retrieve a list of ingredients
router.get('/', getIngredients);

module.exports = router;
