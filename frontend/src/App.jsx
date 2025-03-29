import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router> {/* Wrap in Router to enable routing */}
      <NavBar />
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
      
    </Router>
  );
}

export default App;
