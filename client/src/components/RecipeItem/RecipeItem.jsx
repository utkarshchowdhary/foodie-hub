import Button from '../Button/Button';

import './RecipeItem.scss';

const RecipesItem = ({ recipe }) => {
    return (
        <li className="recipe-item">
            <div className="recipe">
                <div
                    className="recipe_image"
                    style={{ backgroundImage: `url(${recipe.cover_image})` }}
                ></div>
                <div className="recipe_content">
                    <div className="recipe_title">{recipe.title}</div>
                    <p className="recipe_text">{recipe.sub_title}</p>
                    <Button to={`/recipies/${recipe.recipe_id}`}>View</Button>
                </div>
            </div>
        </li>
    );
};

export default RecipesItem;
