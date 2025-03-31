import React, { createContext, useState, useEffect } from 'react';

export const AuthContext2 = createContext();

export const VoterAuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [voterInfo, setVoterInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedToken = localStorage.getItem('token');
        const storedUserType = localStorage.getItem('userType');

        if (storedToken && storedUserType === 'voter') {
            console.log("Voter auth: Restoring login state from localStorage");

            setToken(storedToken);

            setVoterInfo({
                name: localStorage.getItem('userName'),
                voterId: localStorage.getItem('voterId')
            });

            setIsLoggedIn(true);
        } else {
            console.log("Voter auth: No valid voter session found in localStorage");
        }

        setLoading(false);
    }, []);

    const login = (data) => {
        try {
            console.log("Voter auth: Login called with data:", data);

            if (!data || !data.token || !data.voter) {
                console.error("Voter auth: Invalid login data");
                throw new Error("Invalid login response");
            }

            const voterData = {
                name: data.voter.name || '',
                voterId: data.voter.voterId || ''
            };

            setToken(data.token);
            setVoterInfo(voterData);
            setIsLoggedIn(true);

            localStorage.setItem('token', data.token);
            localStorage.setItem('userType', 'voter');
            localStorage.setItem('userName', data.voter.name || '');
            localStorage.setItem('voterId', data.voter.voterId || '');

            console.log("Voter auth: Login completed successfully");
            return true;
        } catch (error) {
            console.error("Voter auth: Login error:", error.message);
            throw error;
        }
    };

    const logout = () => {
        console.log("Voter auth: Logout called");

        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        localStorage.removeItem('voterId');

        setToken(null);
        setVoterInfo(null);
        setIsLoggedIn(false);

        console.log("Voter auth: Logout completed");
    };

    const value = {
        isLoggedIn,
        token,
        voterInfo,
        loading,
        login,
        logout
    };

    return (
        <AuthContext2.Provider value={value}>
            {children}
        </AuthContext2.Provider>
    );
};

export default VoterAuthProvider;