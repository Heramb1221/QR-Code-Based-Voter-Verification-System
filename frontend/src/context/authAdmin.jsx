import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserType = localStorage.getItem('userType');
        const storedUserName = localStorage.getItem('userName');

        // Only restore admin state if userType is explicitly 'admin'
        if (storedToken && storedUserType === 'admin' && storedUserName) {
            console.log("Admin auth: Restoring login state from localStorage");
            setToken(storedToken);
            setUserType(storedUserType);
            setUserName(storedUserName);
            setIsLoggedIn(true);
        } else {
            console.log("Admin auth: No valid admin session found in localStorage");
        }
        setLoading(false);
    }, []);

    const login = (data) => {
        console.log("Admin auth: Login called with data:", data);
        
        // Validate data
        if (!data || !data.token) {
            console.error("Admin auth: Invalid login data");
            return;
        }
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('userName', data.user?.name || '');
        
        setToken(data.token);
        setUserType('admin');
        setUserName(data.user?.name || '');
        setIsLoggedIn(true);
        
        console.log("Admin auth: Login completed successfully");
    };

    const logout = () => {
        console.log("Admin auth: Logout called");
        
        // We only clear admin-specific state here
        // The NavBar component will handle clearing localStorage
        setToken(null);
        setUserType(null);
        setUserName(null);
        setIsLoggedIn(false);
        
        console.log("Admin auth: Logout completed");
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
            {!loading && children}
            {loading && <div>Loading...</div>}
        </AuthContext.Provider>
    );
};