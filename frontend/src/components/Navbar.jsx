// frontend/src/components/NavBar.js
import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FiLogIn, FiLogOut, FiBell, FiMenu, FiX, FiHelpCircle
} from 'react-icons/fi';
import logo from '../assets/mainlogo.png';
import { AuthContext as AdminAuthContext } from '../context/authAdmin';
import { AuthContext2 as VoterAuthContext } from "../context/authVoter";

const NavBar = () => {
    const adminAuth = useContext(AdminAuthContext);
    const voterAuth = useContext(VoterAuthContext);

    const isAdminLoggedIn = adminAuth.isLoggedIn;
    const isVoterLoggedIn = voterAuth.isLoggedIn;
    const isLoggedIn = isAdminLoggedIn || isVoterLoggedIn;
    const userType = isAdminLoggedIn ? 'admin' : (isVoterLoggedIn ? 'voter' : null);

    const [notificationCount, setNotificationCount] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType');
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            if (storedUserType === 'admin' && !isAdminLoggedIn && adminAuth.login) {
                const adminData = {
                    token: storedToken,
                    role: 'admin',
                    user: { name: localStorage.getItem('userName') }
                };
                adminAuth.login(adminData);
            }
            else if (storedUserType === 'voter' && !isVoterLoggedIn && voterAuth.login) {
                const voterData = {
                    token: storedToken,
                    voter: {
                        name: localStorage.getItem('userName'),
                        voterId: localStorage.getItem('voterId')
                    }
                };
                voterAuth.login(voterData);
            }
        }
    }, [isAdminLoggedIn, isVoterLoggedIn, adminAuth, voterAuth]);

    useEffect(() => {
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

        if (isLoggedIn) {
            checkNotifications();
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        localStorage.removeItem('voterId');

        if (isAdminLoggedIn) {
            adminAuth.logout();
        }

        if (isVoterLoggedIn) {
            voterAuth.logout();
        }

        navigate('/');
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
    };

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
    }, [isLoggedIn]);

    return (
        <div className='bg-[#1a73e8] p-4 w-full shadow-md sticky top-0 z-50'>
            <nav className='flex justify-between items-center h-16 max-w-6xl mx-auto'>
                <NavLink to='/' className="flex items-center ml-5">
                    <img src={logo} alt="Logo" width={40} height={40} className="mr-2" />
                    <h1 className='text-xl font-semibold text-white tracking-tight'>QRVotify</h1>
                </NavLink>

                <div className="md:hidden mr-5">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded">
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-[#1a73e8] p-5 space-y-3 z-50 rounded-b-md shadow-md">
                        <NavLink to="/" className="flex items-center text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
                            Home
                        </NavLink>
                        {isLoggedIn && userType === 'admin' && (
                            <>
                                <NavLink to="/create-user" className="flex items-center text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
                                    Create User
                                </NavLink>
                                <NavLink to="/admin-dashboard" className="flex items-center text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
                                    Dashboard
                                </NavLink>
                            </>
                        )}
                        {isLoggedIn && userType === 'voter' && (
                            <>
                                <NavLink to="/voter-profile" className="flex items-center text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
                                    View Card
                                </NavLink>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <NavLink to="/notifications" className="relative flex items-center text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
                                    <FiBell size={20} className="mr-2" />
                                    Notifications
                                    {notificationCount > 0 && (
                                        <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                                            {notificationCount > 9 ? '9+' : notificationCount}
                                        </span>
                                    )}
                                </NavLink>
                                <button onClick={handleLogout} className="flex items-center text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 w-full text-left">
                                    <FiLogOut size={20} className="mr-2" /> Logout
                                </button>
                            </>
                        )}
                        {!isLoggedIn && (
                            <div className="relative">
                                <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 w-full text-left">
                                    <FiLogIn size={20} className="mr-2" /> Login
                                </button>
                                {isProfileDropdownOpen && (
                                    <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
                                        <NavLink to="/admin-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none" onClick={() => setIsMobileMenuOpen(false)}>Admin Login</NavLink>
                                        <NavLink to="/voter-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none" onClick={() => setIsMobileMenuOpen(false)}>Voter Login</NavLink>
                                    </div>
                                )}
                            </div>
                        )}
                        <NavLink to='/about-us' className="flex items-center text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                            <FiHelpCircle size={20} className="mr-2" /> About Us
                        </NavLink>
                    </div>
                )}

                <div className='hidden md:flex items-center space-x-3 mr-5'>
                    <NavLink to='/' className="flex items-center bg-white text-[#1a73e8] hover:bg-gray-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-opacity-50">
                        Home
                    </NavLink>
                    {isLoggedIn && userType === 'admin' && (
                        <>
                            <NavLink to='/create-user' className="flex items-center bg-white text-[#1a73e8] hover:bg-gray-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-opacity-50">
                                Create User
                            </NavLink>
                            <NavLink to='/admin-dashboard' className="flex items-center bg-white text-[#1a73e8] hover:bg-gray-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-opacity-50">
                                Dashboard
                            </NavLink>
                        </>
                    )}
                    {isLoggedIn && userType === 'voter' && (
                        <>
                            <NavLink to='/voter-profile' className="flex items-center bg-white text-[#1a73e8] hover:bg-gray-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-opacity-50">
                                <FiBell size={20} className="mr-1" /> View Card
                            </NavLink>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <NavLink to='/notifications' className="relative flex items-center bg-white text-[#1a73e8] hover:bg-gray-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-opacity-50">
                                <FiBell size={20} className="mr-1" />
                                Notifications
                                {notificationCount > 0 && (
                                    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                                        {notificationCount > 9 ? '9+' : notificationCount}
                                    </span>
                                )}
                            </NavLink>
                            <button onClick={handleLogout} className="flex items-center bg-white text-red-500 hover:bg-gray-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                                <FiLogOut size={20} className="mr-1" /> Logout
                            </button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <div className="relative">
                            <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center bg-white text-green-500 hover:bg-gray-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                <FiLogIn size={20} className="mr-1" /> Login
                            </button>
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                                    <NavLink to="/admin-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none">Admin Login</NavLink>
                                    <NavLink to="/voter-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none">Voter Login</NavLink>
                                </div>
                            )}
                        </div>
                    )}
                    <NavLink to='/about-us' className="flex items-center bg-white text-[#1a73e8] hover:bg-gray-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-opacity-50">
                        <FiHelpCircle size={20} className="mr-1" /> About Us
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;