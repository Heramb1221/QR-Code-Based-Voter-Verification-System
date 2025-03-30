import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserType = localStorage.getItem('userType');
        const storedUserName = localStorage.getItem('userName');

        if (storedToken && storedUserType && storedUserName) {
            setToken(storedToken);
            setUserType(storedUserType);
            setUserName(storedUserName);
            setIsLoggedIn(true);
        }
        setLoading(false); // Set loading to false after checking localStorage
    }, []);

    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', data.role);
        localStorage.setItem('userName', data.user.name);
        setToken(data.token);
        setUserType(data.role);
        setUserName(data.user.name);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        setToken(null);
        setUserType(null);
        setUserName(null);
        setIsLoggedIn(false);
    };

    const value = {
        isLoggedIn,
        userType,
        token,
        userName,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Only render children after checking localStorage */}
            {loading && <div>Loading...</div>} {/* Optional loading indicator */}
        </AuthContext.Provider>
    );
};