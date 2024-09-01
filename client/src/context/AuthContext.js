import { createContext } from 'react';

const AuthContext = createContext({
    isChecking: true,
    isAuthenticated: false,
    isChef: false,
    token: '',
    userId: '',
    role: 'user',
    login: () => {},
    logout: () => {}
});

export default AuthContext;
