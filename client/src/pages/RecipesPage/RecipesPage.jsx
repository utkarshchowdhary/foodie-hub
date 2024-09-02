import { useEffect, useState } from 'react';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import useHttpClient from '../../hooks/useHttpClient';
import recipeData from '../../data/recipes.json';
import RecipesList from '../../components/RecipesList/RecipesList';

const RecipesPage = () => {
    const { isLoading, error, dispatchRequest, clearError } = useHttpClient();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = (await dispatchRequest('/api/v1/recipes')) || {};
            setRecipes(data?.length ? data : recipeData);
        })();
    }, [dispatchRequest]);

    return (
        <>
            <ErrorModal error={error} onCancel={clearError} />
            {isLoading ? <LoadingSpinner /> : <RecipesList recipes={recipes} />}
        </>
    );
};

export default RecipesPage;
