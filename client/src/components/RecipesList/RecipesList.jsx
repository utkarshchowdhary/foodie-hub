import RecipeItem from '../RecipeItem/RecipeItem';

import './RecipesList.scss';

const RecipesList = ({ recipes }) => {
    return (
        <ul className="recipes-list">
            {recipes.map(recipe => (
                <RecipeItem key={recipe.recipe_id} recipe={recipe} />
            ))}
        </ul>
    );
};

export default RecipesList;
