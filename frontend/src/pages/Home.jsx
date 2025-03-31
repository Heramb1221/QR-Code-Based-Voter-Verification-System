import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock, FiShield, FiCheckCircle } from 'react-icons/fi';
import { MdVerified, MdQrCode2, MdLocationOn, MdSecurity, MdNewspaper } from 'react-icons/md';
import { GrSelection } from 'react-icons/gr';
import { FaUserShield, FaShieldAlt, FaFingerprint, FaLock } from 'react-icons/fa';
import homebackground from '../assets/homebackground.png';

const ElectionCountdown = ({ election }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    function calculateTimeLeft() {
        const now = new Date();
        const electionDate = new Date(election.date);
        const difference = electionDate.getTime() - now.getTime();

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg text-[#19567C] mb-2">{election.title}</h3>
            <p className="text-gray-600 mb-4">{new Date(election.date).toLocaleDateString()}</p>
            <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-gray-100 p-2 rounded">
                    <span className="block text-2xl font-bold">{days}</span>
                    <span className="text-sm">Days</span>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                    <span className="block text-2xl font-bold">{hours}</span>
                    <span className="text-sm">Hours</span>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                    <span className="block text-2xl font-bold">{minutes}</span>
                    <span className="text-sm">Mins</span>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                    <span className="block text-2xl font-bold">{seconds}</span>
                    <span className="text-sm">Secs</span>
                </div>
            </div>
        </div>
    );
};

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

const NewsItem = ({ item }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</p>
                <h3 className="font-bold text-xl mb-2 text-[#19567C]">{item.title}</h3>
                <p className="text-gray-700">{item.content.substring(0, 100)}...</p>
                <button 
                    onClick={() => setShowModal(true)} 
                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                    Read More
                </button>
            </div>

            {/* Modal for full news content */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-[#19567C]">{item.title}</h3>
                                <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                            </div>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ×
                            </button>
                        </div>
                        <div className="text-gray-700">
                            <p>{item.content}</p>
                        </div>
                        <div className="mt-6 text-right">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
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

    const votingStats = {
        verifiedVoters: 15000,
        qrCodesGenerated: 12000,
        electionsCompleted: 20
    };

    const testimonials = [
        { id: 1, name: "Priya Sharma", role: "First-time Voter", content: "The QR code system made voting so easy and quick! I felt very secure during the entire process." },
        { id: 2, name: "Ramesh Kumar", role: "Election Officer", content: "This platform significantly streamlined the voter verification process on election day, saving us a lot of time and effort." },
        { id: 3, name: "Sneha Patel", role: "Community Leader", content: "QRVotify has helped build greater trust and transparency in our local elections. It's a fantastic initiative." }
    ];

    const faqs = [
        { id: 1, question: "How does the QR code verification work?", answer: "Upon successful registration and verification by an authorized officer, you will receive a unique QR code linked to your voter ID. On election day, this code is scanned at the polling booth to quickly and securely verify your identity before you cast your vote." },
        { id: 2, question: "Is my personal information safe with QRVotify?", answer: "Yes, the security of your personal information is our utmost priority. We employ robust encryption technologies and stringent data protection protocols to ensure that your data remains safe, secure, and private." },
        { id: 3, question: "What should I do if I am unable to locate a verification officer in my area?", answer: "We are continuously working to expand our network of authorized verification officers across all regions. Please regularly check the 'Find Officers' section on our platform for the latest updates in your locality. If you continue to face difficulties, please do not hesitate to contact our support team for assistance." },
    ];

    const upcomingElectionsData = [
        {
            "title": "Bihar Legislative Assembly election",
            "date": "2025-11-03T00:00:00",
            "location": "Bihar, India"
        },
        {
            "title": "Delhi Legislative Assembly election",
            "date": "2025-06-08T00:00:00",
            "location": "Delhi, India"
        },
        {
            "title": "Jharkhand Legislative Assembly election",
            "date": "2025-08-05T00:00:00",
            "location": "Jharkhand, India"
        },
        {
            "title": "Maharashtra Legislative Assembly election",
            "date": "2025-10-22T00:00:00",
            "location": "Maharashtra, India"
        },
        {
            "title": "Haryana Legislative Assembly election",
            "date": "2025-07-15T00:00:00",
            "location": "Haryana, India"
        }
    ];

    const upcomingElections = upcomingElectionsData
        .filter(election => new Date(election.date) > new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const news = [
        { id: 1, title: "QRVotify Successfully Used in Recent Local Elections", date: "2025-03-25", content: "Our advanced QR-based voter verification system was successfully implemented in the recent local council elections held across several districts. The system ensured a seamless and highly secure voting process, significantly reducing instances of fraudulent activities and enhancing overall efficiency. Election officials reported a 40% reduction in verification time compared to traditional methods, allowing more voters to cast their ballots within the designated time frame. The system's ability to instantly verify voter identities also eliminated long queues at polling stations, contributing to a more convenient and stress-free voting experience for all participants. We are incredibly proud of this achievement and remain committed to further refining our technology to serve democratic processes better." },
        { id: 2, title: "QRVotify Announces New Security Features for Enhanced Protection", date: "2025-03-10", content: "We are thrilled to announce the upcoming release of several new security features designed to further fortify the QRVotify platform and provide an even more secure and trustworthy experience for all users. These enhancements include advanced encryption algorithms, multi-factor authentication for election officials, and real-time monitoring systems to detect and prevent any unauthorized access or manipulation. Our security team has been working tirelessly to implement these state-of-the-art protections, which will be rolled out in phases over the next few months. These upgrades reaffirm our unwavering commitment to maintaining the highest standards of data protection and ensuring the integrity of the electoral process. Stay tuned for more updates as we continue to enhance our security infrastructure." },
        { id: 3, title: "QRVotify Partners with State Government to Expand Verification Officer Network", date: "2025-02-20", content: "QRVotify is proud to announce a strategic partnership with the state government to significantly expand our network of authorized voter verification officers. This collaboration will enable us to reach more communities and ensure that all eligible voters have convenient access to the QR voter ID registration and verification process. We are committed to making voter verification accessible to everyone. As part of this initiative, we will be conducting extensive training programs for newly appointed verification officers to familiarize them with our platform and protocols. The first phase of this expansion will target rural and remote areas where access to voter registration facilities has traditionally been limited. By bridging this gap, we aim to promote greater electoral participation and strengthen the democratic foundation of our society." }
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

            {/* Upcoming Elections Countdown Section */}
            <div className="w-11/12 mx-auto mt-10">
                <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Upcoming Elections in India</h2>
                <div className="mx-auto py-8">
                    <div className="grid mr-6 ml-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Always show at least two elections */}
                        {upcomingElections.slice(0, 3).map(election => (
                            <ElectionCountdown key={election.title} election={election} />
                        ))}
                        {upcomingElections.length === 0 && (
                            <p className="text-gray-700 text-center col-span-full">No upcoming elections scheduled in the near future.</p>
                        )}
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

            {/* Testimonials Section */}
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

            {/* FAQ Section */}
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

            {/* Latest News Section */}
            <div className="w-11/12 mx-auto mt-10 mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Latest Updates</h2>
                <div className="mx-auto py-16">
                    <div className="grid mr-6 ml-6 grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Using new NewsItem component with modal functionality */}
                        {news.map(item => (
                            <NewsItem key={item.id} item={item} />
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