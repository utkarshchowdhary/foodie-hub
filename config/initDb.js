const db = require('./db');

const initDb = async () => {
    // Users table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'chef') DEFAULT 'user' NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

    // Recipes table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS recipes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                chef_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                cover_image VARCHAR(255) NOT NULL,
                draft BOOLEAN DEFAULT TRUE,
                prep_time INT NOT NULL CHECK (prep_time >= 1),
                cook_time INT NOT NULL CHECK (cook_time >= 1),
                servings INT NOT NULL CHECK (servings >= 1),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (chef_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

    // Ingredients table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS ingredients (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_by INT NOT NULL,
                updated_by INT NOT NULL,
                FOREIGN KEY (created_by) REFERENCES users(id),
                FOREIGN KEY (updated_by) REFERENCES users(id)
            );
        `);

    // Recipe Ingredients junction table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS recipe_ingredients (
                recipe_id INT NOT NULL,
                ingredient_id INT NOT NULL,
                quantity DECIMAL(10, 2) CHECK (quantity > 0),
                unit VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (recipe_id, ingredient_id),
                FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
                FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE RESTRICT
            );
        `);

    // Recipe Content table
    await db.execute(`
            CREATE TABLE IF NOT EXISTS recipe_content (
                id INT AUTO_INCREMENT PRIMARY KEY,
                recipe_id INT NOT NULL,
                content_type ENUM('text', 'image') NOT NULL,
                content_heading VARCHAR(255),
                content_text TEXT,
                content_image VARCHAR(255),
                display_order INT NOT NULL CHECK (display_order >= 0),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
