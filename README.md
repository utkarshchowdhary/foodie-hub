# Foodie Hub

Foodie Hub is a full-stack web application that enables users to browse, save, and manage recipes. The application includes user authentication, role-based access control, and a dynamic content system for creating and organizing recipe instructions. Only users with the "chef" role can create and manage recipes.

## Features

-   **User Authentication & Authorization**: Secure sign-up, login, and role-based access control.
-   **Recipe Management**: Chefs can create, update, and manage their recipes, which include titles, subtitles, cover images, ingredients, and additional metadata such as preparation time, cooking time, and servings. They can save recipes as drafts, allowing them to work on and update the content before making it public.
-   **Recipe Saving**: Logged-in users can save their favorite recipes for easy access.
-   **Dynamic Content System**: Recipes can include headings, text, and images arranged in a flexible, dynamic order.
-   **Image Handling**: Chefs can upload and manage images for recipes, including cover images and content images, using Cloudinary for storage and management.
-   **Ingredient Management**: Ingredients are shared between recipes, and each recipe can have specific quantities and units for each ingredient.
-   **Review & Rating System**: Users can review recipes and provide ratings, which are averaged and displayed.
-   **Error Handling & Validation**: Comprehensive error handling and request validation using Zod.

## Tech Stack

-   **Backend**: Node.js, Express.js, MySQL
-   **Frontend**: React.js

---

# Quick Start 🚀

## Clone the repository

```bash
git clone https://github.com/utkarshchowdhary/foodie-hub.git
cd foodie-hub
```

### Configure environment variables in a `.env` file

```bash
DB_HOST=<your-database-host>
DB_USER=<your-database-username>
DB_NAME=<your-database-name>
DB_PASS=<your-database-password>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=<your-jwt-expiration>
```

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

---

# Contribution

Feel free to contribute to this project by submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
