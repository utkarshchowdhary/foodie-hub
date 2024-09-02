import RecipeItem from '../RecipeItem/RecipeItem';

import './RecipesList.scss';

const RecipesList = ({ recipes }) => {
    return (
        <div className="recipes-list">
            {recipes.map(recipe => (
                <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipesList;
