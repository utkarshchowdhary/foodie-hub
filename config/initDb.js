const db = require('./db');

const initDb = async () => {
    // Users table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'chef') NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    // Recipes table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS recipes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                chef_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                cover_image VARCHAR(255),
                draft BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (chef_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

    // Ingredients table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS ingredients (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            );
        `);

    // Recipe Ingredients junction table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS recipe_ingredients (
                recipe_id INT NOT NULL,
                ingredient_id INT NOT NULL,
                quantity VARCHAR(255),
                PRIMARY KEY (recipe_id, ingredient_id),
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
                FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
            );
        `);

    // Recipe Content table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS recipe_content (
                id INT AUTO_INCREMENT PRIMARY KEY,
                recipe_id INT NOT NULL,
                content_type ENUM('text', 'image') NOT NULL,
                content_text TEXT,
                content_image VARCHAR(255),
                display_order INT NOT NULL,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
            );
        `);

    // Reviews table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                recipe_id INT NOT NULL,
                user_id INT NOT NULL,
                rating INT CHECK(rating >= 1 AND rating <= 5),
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

    // Saved Recipes table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS saved_recipes (
                user_id INT NOT NULL,
                recipe_id INT NOT NULL,
                saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, recipe_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
            );
        `);

    // Recipe Summary View
    await db.execute(`
            CREATE OR REPLACE VIEW recipe_summary AS
            SELECT
                r.id AS recipe_id,
                r.title,
                r.cover_image,
                COALESCE(AVG(rv.rating), 0) AS average_rating,
                COUNT(rv.id) AS total_reviews
            FROM
                recipes r
            LEFT JOIN
                reviews rv ON r.id = rv.recipe_id
            GROUP BY
                r.id, r.title, r.cover_image;
        `);

    console.log('Database initialized successfully');
};

module.exports = initDb;
