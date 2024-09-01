const { z } = require('zod');

const ingredientSchema = z.object({
    id: z.number().optional(), // Optional for new ingredients
    name: z
        .string()
        .min(1, { message: 'Name is required' })
        .max(255, { message: 'Name is too long' }),
    description: z.string().optional(),
    quantity: z.number().gt(0).optional(),
    unit: z.string().max(50, { message: 'Unit is too long' }).optional() // e.g., grams, cups, etc.
});

const contentSchema = z
    .object({
        content_type: z.enum(['text', 'image'], {
            message: 'Content type must be either "text" or "image"'
        }),
        content_heading: z.string().max(255).nullable().default(null),
        content_text: z.string().nullable().default(null),
        content_image: z
            .string()
            .url({ message: 'Content image URL must be a valid URL' })
            .nullable()
            .default(null)
    })
    .refine(
        data =>
            data.content_type === 'text'
                ? data.content_text || data.content_heading
                : data.content_image,
        {
            message:
                'If content_type is "text", at least one of content_text or content_heading is required. If content_type is "image", content_image is required',
            path: ['content_text', 'content_heading', 'content_image']
        }
    );

const recipeSchema = z.object({
    title: z.string().min(3, 'Title is required').max(255),
    cover_image: z
        .string()
        .url({ message: 'Cover image URL must be a valid URL' })
        .min(1, 'Cover image URL is required'),
    draft: z.boolean().default(true),
    prep_time: z.number().int().min(1, { message: 'Preparation time must be at least 1 minute' }),
    cook_time: z.number().int().min(1, { message: 'Cooking time must be at least 1 minute' }),
    servings: z.number().int().min(1, { message: 'Servings must be at least 1' }),
    ingredients: z
        .array(ingredientSchema)
        .min(1, { message: 'At least one ingredient is required' }),
    content: z.array(contentSchema).min(1, { message: 'At least one content item is required' })
});

module.exports = recipeSchema;
