import { useState, useCallback, useEffect, useRef } from 'react';

const useAuth = expiresIn => {
    const [isChecking, setIsChecking] = useState(true);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('user');

    const logoutTimer = useRef();

    const logout = useCallback(() => {
        setToken('');
        setUserId('');
        setRole('user');
        clearTimeout(logoutTimer.current);
        localStorage.removeItem('userData');
    }, []);

    const login = useCallback(
        (userId, role, token, expirationDate = new Date(new Date().getTime() + expiresIn)) => {
            setToken(token);
            setUserId(userId);
            setRole(role);

            const remainingTime = expirationDate.getTime() - new Date().getTime();
            logoutTimer.current = setTimeout(logout, remainingTime);

            localStorage.setItem(
                'userData',
                JSON.stringify({
                    userId,
                    role,
                    token,
                    expiration: expirationDate.toISOString()
                })
            );
        },
        [expiresIn, logout]
    );

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && new Date(userData.expiration) > new Date()) {
            login(userData.userId, userData.role, userData.token, new Date(userData.expiration));
        }

        setIsChecking(false);

        return () => {
            clearTimeout(logoutTimer.current);
        };
    }, [login]);

    return { isChecking, token, userId, role, login, logout };
};

export default useAuth;
