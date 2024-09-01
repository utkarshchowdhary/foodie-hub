import { useEffect, useState } from 'react';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import useHttpClient from '../../hooks/useHttpClient';

const RecipesPage = () => {
    const { isLoading, error, dispatchRequest, clearError } = useHttpClient();
    const [recipes, setRecipes] = useState([]);

    console.log('Rendered', isLoading, error);

    useEffect(() => {
        (async () => {
            const { data } = (await dispatchRequest('/api/v1/recipes')) || {};
            if (data) setRecipes(data);
        })();
    }, [dispatchRequest]);

    return (
        <>
            <ErrorModal error={error} onCancel={clearError} />
            {isLoading ? <LoadingSpinner /> : <h1>{recipes.length}</h1>}
        </>
    );
};

export default RecipesPage;
