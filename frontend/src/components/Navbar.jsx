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

    // Sync auth state with localStorage on component mount
    useEffect(() => {
        // Check which type of user is logged in from localStorage
        const storedUserType = localStorage.getItem('userType');
        const storedToken = localStorage.getItem('token');
        
        // Only attempt to restore login state if we have a token but the corresponding context isn't logged in
        if (storedToken) {
            if (storedUserType === 'admin' && !isAdminLoggedIn && adminAuth.login) {
                console.log("Restoring admin login state from localStorage");
                // Reconstruct admin login state
                const adminData = {
                    token: storedToken,
                    role: 'admin',
                    user: { name: localStorage.getItem('userName') }
                };
                adminAuth.login(adminData);
            } 
            else if (storedUserType === 'voter' && !isVoterLoggedIn && voterAuth.login) {
                console.log("Restoring voter login state from localStorage");
                // Reconstruct voter login state
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
    }, []);

    // Log auth state changes for debugging
    useEffect(() => {
        console.log("Auth State Updated:", { 
            adminLoggedIn: isAdminLoggedIn, 
            voterLoggedIn: isVoterLoggedIn,
            localStorageUserType: localStorage.getItem('userType'),
            currentUserType: userType
        });
    }, [isAdminLoggedIn, isVoterLoggedIn, userType]);

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
        // Log the state before logout
        console.log("Logging out. Current state:", { 
            isAdminLoggedIn, 
            isVoterLoggedIn, 
            userType,
            storedUserType: localStorage.getItem('userType')
        });

        // Always clear localStorage regardless of which type is logged in
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        localStorage.removeItem('voterId');
        
        // Call both logout functions to ensure complete state reset
        if (isAdminLoggedIn) {
            adminAuth.logout();
        }
        
        if (isVoterLoggedIn) {
            voterAuth.logout();
        }
        
        // Redirect and close menus
        navigate('/');
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
    };

    useEffect(() => {
        if (isLoggedIn) {
            checkNotifications();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
    }, [isLoggedIn]);

    // Log the rendered state for debugging
    console.log("NavBar Render State:", { 
        isAdminLoggedIn, 
        isVoterLoggedIn, 
        userType,
        notificationCount
    });

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
                    <div className="md:hidden absolute top-20 left-0 w-full bg-blue-600 p-5 space-y-4 z-50">
                        <NavLink to="/" className="block text-white" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
                        {isLoggedIn && userType === 'admin' && (
                            <>
                                <NavLink to="/create-user" className="block text-white" onClick={() => setIsMobileMenuOpen(false)}>Create User</NavLink>
                                <NavLink to="/admin-dashboard" className="block text-white" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink>
                            </>
                        )}
                        {isLoggedIn && userType === 'voter' && (
                            <>
                                <NavLink to="/voter-dashboard" className="block text-white" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <NavLink to="/notifications" className="relative block text-white" onClick={() => setIsMobileMenuOpen(false)}>
                                    <FiBell size={20} />
                                    {notificationCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                                            {notificationCount > 9 ? '9+' : notificationCount}
                                        </span>
                                    )}
                                </NavLink>
                                <button onClick={handleLogout} className="block text-white">
                                    <FiLogOut size={20} /> Logout
                                </button>
                            </>
                        )}
                        {!isLoggedIn && (
                            <div className="relative">
                                <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="block text-white">
                                    <FiLogIn /> Login
                                </button>
                                {isProfileDropdownOpen && (
                                    <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
                                        <NavLink to="/admin-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Admin Login</NavLink>
                                        <NavLink to="/voter-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Voter Login</NavLink>
                                    </div>
                                )}
                            </div>
                        )}
                        <NavLink to='/about-us' className="block text-white" onClick={() => setIsMobileMenuOpen(false)}><FiHelpCircle /></NavLink>
                    </div>
                )}

                <div className='hidden md:flex items-center space-x-4 mr-5'>
                    <NavLink to='/' className="text-white hover:text-gray-300">Home</NavLink>
                    {isLoggedIn && userType === 'admin' && (
                        <>
                            <NavLink to='/create-user' className="text-white hover:text-gray-300">Create User</NavLink>
                            <NavLink to='/admin-dashboard' className="text-white hover:text-gray-300">Dashboard</NavLink>
                        </>
                    )}
                    {isLoggedIn && userType === 'voter' && (
                        <>
                            <NavLink to='/voter-dashboard' className="text-white hover:text-gray-300">Dashboard</NavLink>
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