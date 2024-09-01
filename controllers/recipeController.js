const db = require('../config/db');

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

const getRecipes = async (req, res) => {
    try {
        const [recipes] = await db.execute('SELECT * FROM recipes WHERE draft = FALSE');

        res.status(200).json({ status: 'success', data: recipes });
    } catch (error) {
        console.error('Error getting recipes.', error);

        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = {
    createRecipe,
    getRecipes
};
