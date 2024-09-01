const db = require('../config/db');

const getRecipes = async (req, res) => {
    try {
        const [recipes] = await db.execute('SELECT * FROM recipe_summary');

        res.status(200).json({ status: 'success', data: recipes });
    } catch (error) {
        console.error('Error getting recipes.', error);

        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

const getRecipe = async (req, res) => {
    const { id: recipeId } = req.params;

    try {
        // Fetch the recipe
        const [[recipe] = []] = await db.execute(
            'SELECT * FROM recipe_summary WHERE recipe_id = ?',
            [recipeId]
        );

        if (!recipe) {
            return res.status(404).json({ status: 'error', message: 'Recipe not found' });
        }

        // Fetch ingredients with quantities and units
        const [ingredients] = await db.execute(
            `
            SELECT
                i.id AS ingredient_id,
                i.name,
                i.description,
                ri.quantity,
                ri.unit
            FROM
                ingredients i
            JOIN
                recipe_ingredients ri ON i.id = ri.ingredient_id
            WHERE
                ri.recipe_id = ?`,
            [recipeId]
        );

        // Fetch content
        const [content] = await db.execute(
            'SELECT * FROM recipe_content WHERE recipe_id = ? ORDER BY display_order',
            [recipeId]
        );

        res.status(200).json({
            status: 'success',
            data: {
                ...recipe,
                ingredients,
                content
            }
        });
    } catch (error) {
        console.error(`Error getting recipe with ID ${recipeId}.`, error);

        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

const createRecipe = async (req, res) => {
    const { id: chefId } = req.userData;
    const { title, cover_image, draft, prep_time, cook_time, servings, ingredients, content } =
        req.body;

    try {
        // Insert the recipe into the recipes table
        const [{ insertId: recipeId }] = await db.execute(
            'INSERT INTO recipes (chef_id, title, cover_image, draft, prep_time, cook_time, servings) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [chefId, title, cover_image, draft, prep_time, cook_time, servings]
        );

        for (const ingredient of ingredients) {
            // Perform upsert on the ingredients table
            const [{ insertId: ingredientId }] = await db.execute(
                "INSERT INTO ingredients (name, description, created_by, updated_by) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE updated_by = IF(VALUES(description) IS NOT NULL AND (IFNULL(description, '') <> VALUES(description)), VALUES(updated_by), updated_by), description = COALESCE(VALUES(description), description), id = LAST_INSERT_ID(id)",
                [ingredient.name, ingredient.description, chefId, chefId]
            );

            // Insert into recipe_ingredients junction table
            await db.execute(
                'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)',
                [recipeId, ingredientId, ingredient.quantity, ingredient.unit]
            );
        }

        // Insert content into the recipe_content table
        for (let i = 0; i < content.length; i++) {
            const widget = content[i];

            await db.execute(
                'INSERT INTO recipe_content (recipe_id, content_type, content_heading, content_text, content_image, display_order) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    recipeId,
                    widget.content_type,
                    widget.content_heading,
                    widget.content_text,
                    widget.content_image,
                    i // Using the index for display order
                ]
            );
        }

        res.status(201).json({ status: 'success' });
    } catch (error) {
        console.error('Error creating recipe.', error);

        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe
};
