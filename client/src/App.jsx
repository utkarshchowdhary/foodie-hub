import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthContext from './context/AuthContext';
import useAuth from './hooks/useAuth';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Header from './components/Header/Header';
const RecipesPage = lazy(() => import('./pages/RecipesPage/RecipesPage'));

function App() {
    const { isChecking, token, role, userId, login, logout } = useAuth(60 * 60 * 1000);

    return (
        <AuthContext.Provider
            value={{
                isChecking,
                isAuthenticated: !!token,
                isChef: role === 'chef',
                token,
                role,
                userId,
                login,
                logout
            }}
        >
            <Router>
                <Header />
                <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            <Route path="/" element={<RecipesPage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
