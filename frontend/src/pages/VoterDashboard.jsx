import React, { useContext, useEffect } from 'react';
import { AuthContext2 } from '../context/authVoter';
import { useNavigate } from 'react-router-dom';
import { BsPersonBadge } from 'react-icons/bs';

const VoterDashboard = () => {
    const { isLoggedIn, voterInfo, loading } = useContext(AuthContext2);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && !loading) {
            navigate('/voter-login');
        }
    }, [isLoggedIn, loading, navigate]);

    if (!isLoggedIn && !loading) {
        return null;
    }

    if (loading) {
        return <div>Loading voter data...</div>;
    }

    return (
        <div className="bg-slate-50 min-h-screen p-6">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-blue-600 text-white py-4 px-6">
                    <h2 className="font-semibold text-lg flex items-center">
                        <BsPersonBadge className="mr-2" /> Voter Dashboard
                    </h2>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Welcome, {voterInfo?.name || 'Voter'}!
                    </h3>
                    <p className="text-gray-700 mb-2">
                        Voter ID: <span className="font-semibold">{voterInfo?.voterId || 'N/A'}</span>
                    </p>
                    <p className="text-gray-700 mb-2">
                        Your account is verified.
                    </p>
                    <button
                        onClick={() => navigate('/voter-profile')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        View Voter Card
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoterDashboard;