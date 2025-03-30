import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock, FiShield, FiCheckCircle } from 'react-icons/fi';
import { MdVerified, MdQrCode2, MdLocationOn, MdSecurity, MdNewspaper } from 'react-icons/md';
import { GrSelection } from 'react-icons/gr';
import { FaUserShield, FaShieldAlt, FaFingerprint, FaLock } from 'react-icons/fa';
import { BsFillQuestionCircleFill, BsCalendarEvent } from 'react-icons/bs';
import homebackground from '../assets/homebackground.png';

// Component for upcoming election countdown (static demo)
const ElectionCountdown = ({ election }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg text-[#19567C] mb-2">{election.name}</h3>
            <p className="text-gray-600 mb-4">{new Date(election.date).toLocaleDateString()}</p>
            <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-gray-100 p-2 rounded">
                    <span className="block text-2xl font-bold">30</span>
                    <span className="text-sm">Days</span>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                    <span className="block text-2xl font-bold">10</span>
                    <span className="text-sm">Hours</span>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                    <span className="block text-2xl font-bold">45</span>
                    <span className="text-sm">Mins</span>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                    <span className="block text-2xl font-bold">22</span>
                    <span className="text-sm">Secs</span>
                </div>
            </div>
        </div>
    );
};

// FAQ Accordion Item Component (static demo)
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <span className="text-xl">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
                <div className="mt-2 text-gray-600">
                    {answer}
                </div>
            )}
        </div>
    );
};

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/find-officers');
    };

    // Static Demo Data
    const votingStats = {
        verifiedVoters: 15000,
        qrCodesGenerated: 12000,
        electionsCompleted: 20
    };

    const testimonials = [
        { id: 1, name: "Jane Smith", role: "First-time Voter", content: "The QR code system made voting so easy and quick! I felt very secure." },
        { id: 2, name: "Michael Johnson", role: "Election Officer", content: "This platform significantly streamlined the verification process on election day." },
        { id: 3, name: "Sarah Williams", role: "Community Leader", content: "QRVotify has helped increase trust and transparency in our local elections." }
    ];

    const faqs = [
        { id: 1, question: "How does the QR code verification work?", answer: "Upon registration and verification by an officer, you receive a unique QR code. On election day, this code is scanned to quickly and securely confirm your identity." },
        { id: 2, question: "Is my personal information safe?", answer: "Yes, security is our top priority. We use robust encryption and data protection measures to ensure your information is safe and private." },
        { id: 3, question: "What happens if I can't find a verification officer?", answer: "We are continuously expanding our network of verification officers. Please check the 'Find Officers' section regularly for updates in your area. Contact support if you face difficulties." },
    ];

    const upcomingElections = [
        { id: 1, name: "Local Council Elections", date: "2025-04-15T00:00:00" },
        { id: 2, name: "State Assembly Elections", date: "2025-06-20T00:00:00" }
    ];

    const news = [
        { id: 1, title: "QRVotify Successfully Used in Recent Elections", date: "2025-03-25", content: "Our QR-based verification system was successfully implemented in the recent local elections, ensuring a smooth and secure process..." },
        { id: 2, title: "New Features Announced for Enhanced Security", date: "2025-03-10", content: "We are excited to announce upcoming features that will further enhance the security and user experience of QRVotify..." },
        { id: 3, title: "Partnership to Expand Verification Officer Network", date: "2025-02-20", content: "QRVotify is partnering with local organizations to significantly expand our network of authorized verification officers across the state..." }
    ];

    return (
        <div className="bg-slate-50 text-dark min-h-screen">
            {/* Hero Section */}
            <div className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white px-6 py-10" style={{ backgroundImage: `url(${homebackground})` }}>
                <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg text-center w-full md:w-2/3">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">Secure & Reliable QR-Based Voter Verification</h1>
                    <p className="text-lg mb-6 text-gray-300">Experience a modern and secure way to verify your voter identity.</p>
                    <button onClick={handleGetStarted} className="bg-[#ffc107] text-dark px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-[#e0a800] transition">
                        Get Started <FiArrowRight className="inline ml-2" />
                    </button>
                </div>
            </div>

            {/* Live Voting Section (Static Demo) */}
            <div className="bg-slate-50 w-11/12 mx-auto rounded-t-2xl border border-lime-200 mt-10">
                <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Live Voting Statistics</h2>
                <div className="mx-auto py-8 text-center">
                    <div className="grid mr-6 ml-6 grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center justify-center">
                            <MdVerified className="text-6xl text-[#19567C] mb-4" />
                            <h3 className="text-xl font-bold text-[#19567C]">
                                {votingStats.verifiedVoters.toLocaleString()}
                            </h3>
                            <p className="text-gray-700">Verified Voters</p>
                        </div>
                        <div className="p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center justify-center">
                            <MdQrCode2 className="text-6xl text-green-600 mb-4" />
                            <h3 className="text-xl font-bold text-green-600">
                                {votingStats.qrCodesGenerated.toLocaleString()}
                            </h3>
                            <p className="text-gray-700">QR Codes Generated</p>
                        </div>
                        <div className="p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center justify-center">
                            <GrSelection className="text-6xl text-red-500 mb-4" />
                            <h3 className="text-xl font-bold text-red-500">
                                {votingStats.electionsCompleted}
                            </h3>
                            <p className="text-gray-700">Elections Conducted</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Elections Countdown Section (Static Demo) */}
            <div className="w-11/12 mx-auto mt-10">
                <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Upcoming Elections</h2>
                <div className="mx-auto py-8">
                    <div className="grid mr-6 ml-6 grid-cols-1 md:grid-cols-2 gap-6">
                        {upcomingElections.slice(0, 2).map(election => (
                            <ElectionCountdown key={election.id} election={election} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="w-11/12 mx-auto mt-10">
                <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Why Choose QRVotify?</h2>
                <div className="max-w-6xl mx-auto py-16 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 shadow-lg rounded-lg bg-white">
                            <div className="flex justify-center mb-4">
                                <MdQrCode2 className="text-5xl text-[#19567C]" />
                            </div>
                            <h3 className="text-xl font-semibold text-dark">Unique QR Code</h3>
                            <p className="text-gray-600">Every registered voter receives a unique and secure QR code.</p>
                        </div>
                        <div className="p-6 shadow-lg rounded-lg bg-white">
                            <div className="flex justify-center mb-4">
                                <MdVerified className="text-5xl text-[#19567C]" />
                            </div>
                            <h3 className="text-xl font-semibold text-dark">Fast Verification</h3>
                            <p className="text-gray-600">Quickly verify voter identity using a simple QR code scan.</p>
                        </div>
                        <div className="p-6 shadow-lg rounded-lg bg-white">
                            <div className="flex justify-center mb-4">
                                <MdLocationOn className="text-5xl text-[#19567C]" />
                            </div>
                            <h3 className="text-xl font-semibold text-dark">Find Officers</h3>
                            <p className="text-gray-600">Locate nearby authorized officers for registration and support.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Features Section */}
            <div className="bg-slate-50 w-11/12 mx-auto rounded-t-2xl border border-lime-200 mt-10">
                <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Security Measures</h2>
                <div className="max-w-6xl mx-auto py-16 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="p-6 shadow-lg rounded-lg bg-white">
                            <div className="flex justify-center mb-4">
                                <FaLock className="text-5xl text-[#19567C]" />
                            </div>
                            <h3 className="text-xl font-semibold text-dark">Encrypted Data</h3>
                            <p className="text-gray-600">All voter data is securely encrypted to protect your privacy.</p>
                        </div>
                        <div className="p-6 shadow-lg rounded-lg bg-white">
                            <div className="flex justify-center mb-4">
                                <FaFingerprint className="text-5xl text-[#19567C]" />
                            </div>
                            <h3 className="text-xl font-semibold text-dark">Unique Identity</h3>
                            <p className="text-gray-600">Each QR code is unique to a registered voter, preventing fraud.</p>
                        </div>
                        <div className="p-6 shadow-lg rounded-lg bg-white">
                            <div className="flex justify-center mb-4">
                                <FaShieldAlt className="text-5xl text-[#19567C]" />
                            </div>
                            <h3 className="text-xl font-semibold text-dark">Tamper-Proof</h3>
                            <p className="text-gray-600">The QR code system is designed to be resistant to tampering.</p>
                        </div>
                        <div className="p-6 shadow-lg rounded-lg bg-white">
                            <div className="flex justify-center mb-4">
                                <FaUserShield className="text-5xl text-[#19567C]" />
                            </div>
                            <h3 className="text-xl font-semibold text-dark">Secure Access</h3>
                            <p className="text-gray-600">Only authorized personnel can access and verify voter information.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Workflow Section */}
            <div className="bg-gray-300 w-11/12 mx-auto rounded-t-2xl border border-slate-700 mt-10">
                <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">How It Works</h2>
                <div className="py-16">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="p-6 shadow-md rounded-lg bg-white">
                                <h3 className="text-lg font-semibold text-dark">Step 1</h3>
                                <p className="text-gray-600">Register on our platform.</p>
                            </div>
                            <div className="p-6 shadow-md rounded-lg bg-white">
                                <h3 className="text-lg font-semibold text-dark">Step 2</h3>
                                <p className="text-gray-600">Get verified by an authorized officer.</p>
                            </div>
                            <div className="p-6 shadow-md rounded-lg bg-white">
                                <h3 className="text-lg font-semibold text-dark">Step 3</h3>
                                <p className="text-gray-600">Receive your secure QR voter ID.</p>
                            </div>
                            <div className="p-6 shadow-md rounded-lg bg-white">
                                <h3 className="text-lg font-semibold text-dark">Step 4</h3>
                                <p className="text-gray-600">Use your QR code to vote securely.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section (Static Demo) */}
            <div className="w-11/12 mx-auto mt-10">
                <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">What Our Users Say</h2>
                <div className="mx-auto py-16">
                    <div className="grid mr-6 ml-6 grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="bg-white p-6 shadow-lg rounded-lg">
                                <div className="mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">★</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                                <div className="text-right">
                                    <p className="font-semibold text-dark">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section (Static Demo) */}
            <div className="bg-gray-100 w-11/12 mx-auto rounded-t-2xl mt-10">
                <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Frequently Asked Questions</h2>
                <div className="max-w-4xl mx-auto py-16 px-6">
                    <div>
                        {faqs.map(faq => (
                            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Latest News Section (Static Demo) */}
            <div className="w-11/12 mx-auto mt-10 mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Latest Updates</h2>
                <div className="mx-auto py-16">
                    <div className="grid mr-6 ml-6 grid-cols-1 md:grid-cols-3 gap-6">
                        {news.map(item => (
                            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <p className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</p>
                                    <h3 className="font-bold text-xl mb-2 text-[#19567C]">{item.title}</h3>
                                    <p className="text-gray-700">{item.content.substring(0, 100)}...</p>
                                    <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">Read More</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center py-16 bg-gray-200">
                <h2 className="text-2xl font-bold text-dark mb-4">Ready for a More Secure Voting Process?</h2>
                <button onClick={handleGetStarted} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default Home;