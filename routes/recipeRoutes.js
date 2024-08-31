const express = require('express');

const recipeSchema = require('../schemas/recipeSchema');
const { validateRequest } = require('../middlewares/validateRequest');

const router = express.Router();

// Recipe creation route
router.post('/', validateRequest(recipeSchema), (req, res) => {
    res.status(201).json({ status: 'success', message: 'Recipe created' });
});

module.exports = router;
