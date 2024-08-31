const { z } = require('zod');

const recipeSchema = z.object({
    title: z.string().min(3).max(255),
    draft: z.boolean().optional(),
    prep_time: z.number().int().positive().min(1),
    cook_time: z.number().int().positive().min(1),
    servings: z.number().int().positive().min(1)
});

module.exports = recipeSchema;
