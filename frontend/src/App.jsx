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
import Home from './pages/Home';
import FindOfficerPage from './components/FindOfficerPage';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import ScannerPage from './pages/ScannerPage';
import ManageUsers from './components/ManageUsers';
import ManageContent from './components/ManageContent';
import Notification from './components/Notification';

function App() {
    return (
        <Router>
            <AuthProvider>
                <VoterAuthProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/users" element={<ManageUsers/>} />
                        <Route path="/admin/content" element={<ManageContent/>} />
                        <Route path="/notifications" element={<Notification/>} />
                        <Route path="/create-user" element={<CreateUser />} />
                        <Route path="/voter-login" element={<VoterLogin />} />
                        <Route path="/voter-dashboard" element={<VoterDashboard />} />
                        <Route path="/voter-profile" element={<VoterProfile />} />
                        <Route path="/scanner" element={<ScannerPage />} />
                        <Route path="/" element={<Home/>} />
                        <Route path="/find-officers" element={<FindOfficerPage/>} />
                        <Route path="/about-us" element={<AboutUs />}/>
                        <Route path="/notifications" element={<div className="p-8 text-center">Notifications</div>} />
                    </Routes>
                    <Footer />
                </VoterAuthProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;