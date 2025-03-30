import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import AdminLogin from './components/AdminLogin';
import { AuthProvider } from './context/authAdmin';
import { VoterAuthProvider } from './context/authVoter';
import AdminDashboard from './pages/AdminDashboard';
import CreateUser from './pages/CreateUser';
import VoterLogin from './components/VoterLogin';
import VoterDashboard from './pages/VoterDashboard';
import VoterProfile from './pages/VoterProfile';

function App() {
    return (
        <Router>
            <AuthProvider>
                <VoterAuthProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/create-user" element={<CreateUser />} />
                        <Route path="/voter-login" element={<VoterLogin />} />
                        <Route path="/voter-dashboard" element={<VoterDashboard />} />
                        <Route path="/voter-profile" element={<VoterProfile />} />
                        {/* Add any other routes here */}
                        <Route path="/" element={<div className="p-8 text-center">Welcome to QRVotify</div>} />
                        <Route path="/about-us" element={<div className="p-8 text-center">About QRVotify</div>} />
                        <Route path="/notifications" element={<div className="p-8 text-center">Notifications</div>} />
                    </Routes>
                </VoterAuthProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;