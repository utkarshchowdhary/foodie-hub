import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthContext from './context/AuthContext';
import useAuth from './hooks/useAuth';
import Header from './components/Header/Header';

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
                <Routes>
                    {/* <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} /> */}
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
