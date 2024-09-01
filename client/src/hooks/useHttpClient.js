import { useState, useCallback, useRef, useEffect } from 'react';

const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const activeHttpRequests = useRef([]);

    const dispatchRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);

        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });

            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
            );

            if (!response.ok) {
                throw new Error(responseData.message || 'Request failed');
            }

            setIsLoading(false);
            return responseData;
        } catch (err) {
            if (err.name === 'AbortError') return;

            setIsLoading(false);
            setError(err.message || 'Something went wrong');
        }
    }, []);

    const clearError = useCallback(() => {
        setError('');
    }, []);

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(reqCtrl => reqCtrl.abort());
        };
    }, []);

    return { isLoading, error, dispatchRequest, clearError };
};

export default useHttpClient;
