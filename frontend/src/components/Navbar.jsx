// frontend/src/components/NavBar.js
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FiLogIn, FiLogOut, FiBell, FiMenu, FiX, FiHelpCircle
} from 'react-icons/fi';
import logo from '../assets/mainlogo.png';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null); // Initialize userType to null
    const [userName, setUserName] = useState('');
    const [notificationCount, setNotificationCount] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const fetchUserDataFromLocalStorage = () => {
        const token = localStorage.getItem('token');
        const storedUserType = localStorage.getItem('userType');
        const userName = localStorage.getItem('userName');
        console.log("fetchUserDataFromLocalStorage called:", { token, storedUserType, userName });
        console.log("localStorage userType:", storedUserType);
        setUserType(storedUserType);
        setIsLoggedIn(!!token && !!storedUserType && !!userName);
        setUserName(userName);
        if (token) {
            checkNotifications();
        }
    };

    const checkNotifications = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:5000/api/notifications/unread', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setNotificationCount(data.count);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        setIsLoggedIn(false);
        setUserType(null);
        navigate('/');
        window.dispatchEvent(new Event('storage'));
    };

    useEffect(() => {
        fetchUserDataFromLocalStorage();
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            console.log("Storage event triggered");
            fetchUserDataFromLocalStorage();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    console.log("NavBar rendered:", { isLoggedIn, userType });

    return (
        <div className='bg-blue-600 p-2 w-full shadow-md'>
            <nav className='flex justify-between items-center h-20 max-w-6xl mx-auto'>
                <NavLink to='/' className="flex items-center ml-5">
                    <img src={logo} alt="Logo" width={50} height={50} className="mr-2" />
                    <h1 className='text-xl font-bold text-white'>QRVotify</h1>
                </NavLink>

                <div className="md:hidden mr-5">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 w-full bg-blue-600 p-5 space-y-4">
                        <NavLink to="/" className="text-white">Home</NavLink>
                        {isLoggedIn && userType === 'admin' && (
                            <>
                                <NavLink to="/create-user" className="text-white">Create User</NavLink>
                                <NavLink to="/profile" className="text-white">Profile</NavLink>
                            </>
                        )}
                        {isLoggedIn && userType === 'voter' && (
                            <>
                                <NavLink to="/voter-card" className="text-white">Voter Card</NavLink>
                                <NavLink to="/profile" className="text-white">Profile</NavLink>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <NavLink to="/notifications" className="relative text-white">
                                    <FiBell size={20} />
                                    {notificationCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                                            {notificationCount > 9 ? '9+' : notificationCount}
                                        </span>
                                    )}
                                </NavLink>
                                <button onClick={handleLogout} className="text-white">
                                    <FiLogOut size={20} /> Logout
                                </button>
                            </>
                        )}
                        {!isLoggedIn && (
                            <div className="relative">
                                <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="text-white">
                                    <FiLogIn /> Login
                                </button>
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                                        <NavLink to="/admin-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Admin Login</NavLink>
                                        <NavLink to="/voter-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Voter Login</NavLink>
                                    </div>
                                )}
                            </div>
                        )}
                        <NavLink to='/about-us' className="text-white"><FiHelpCircle /></NavLink>
                    </div>
                )}

                <div className='hidden md:flex items-center space-x-4 mr-5'>
                    <NavLink to='/' className="text-white hover:text-gray-300">Home</NavLink>
                    {isLoggedIn && userType === 'admin' && (
                        <>
                            <NavLink to='/create-user' className="text-white hover:text-gray-300">Create User</NavLink>
                            <NavLink to='/profile' className="text-white hover:text-gray-300">Profile</NavLink>
                        </>
                    )}
                    {isLoggedIn && userType === 'voter' && (
                        <>
                            <NavLink to='/voter-card' className="text-white hover:text-gray-300">Voter Card</NavLink>
                            <NavLink to='/profile' className="text-white hover:text-gray-300">Profile</NavLink>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <NavLink to='/notifications' className="relative text-white hover:text-gray-300">
                                <FiBell size={20} />
                                {notificationCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                                        {notificationCount > 9 ? '9+' : notificationCount}
                                    </span>
                                )}
                            </NavLink>
                            <button onClick={handleLogout} className="text-white hover:text-gray-300">
                                <FiLogOut size={20} /> Logout
                            </button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <div className="relative">
                            <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="text-white">
                                <FiLogIn /> Login
                            </button>
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                                    <NavLink to="/admin-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Admin Login</NavLink>
                                    <NavLink to="/voter-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Voter Login</NavLink>
                                </div>
                            )}
                        </div>
                    )}
                    <NavLink to='/about-us' className="text-white hover:text-gray-300"><FiHelpCircle /></NavLink>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;