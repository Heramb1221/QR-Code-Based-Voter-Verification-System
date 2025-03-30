import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import AdminLogin from './components/AdminLogin';
import { AuthProvider } from './context/authContext'; // Make sure the path is correct
import AdminDashboard from './pages/AdminDashboard';
import CreateUser from './pages/CreateUser';
import VoterLogin from './components/VoterLogin';

function App() {
    return (
        <AuthProvider> {/* Wrap your Router and components with AuthProvider */}
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/voter-login" element={<VoterLogin />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;