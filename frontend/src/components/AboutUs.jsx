import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaShieldAlt,
    FaChartLine,
    FaUsers,
    FaLightbulb,
    FaPaperPlane,
    FaUniversity,
    FaLock,
    FaQuestionCircle,
    FaEnvelope,
    FaPhone,
    FaCheckCircle
} from 'react-icons/fa';

const AboutUs = () => {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback submitted:', feedback);
        setSubmitted(true);
        setFeedback('');
    };

    const handleGetStartedClick = () => {
        navigate('/voter-login');
    };

    const securityDetails = [
        "End-to-end encryption for all voter data, ensuring confidentiality from transmission to storage.",
        "Secure QR code generation with dynamic, non-predictable identifiers, making them virtually impossible to replicate.",
        "Multi-layered protection against tampering and fraudulent activities, including digital signatures and audit trails.",
        "Regular and rigorous security audits conducted by independent cybersecurity experts to identify and address potential vulnerabilities.",
        "Strict adherence to global data protection and privacy regulations, prioritizing user data sovereignty and compliance."
    ];

    const potentialImpact = [
        "Dramatically reduces the risk of voter impersonation and double voting, bolstering election integrity.",
        "Significantly accelerates voter verification at polling stations, leading to shorter queues and a more efficient voting process.",
        "Substantially enhances public confidence in the fairness and accuracy of electoral outcomes, fostering greater civic engagement.",
        "Potentially increases voter participation by simplifying the verification process and reducing barriers to casting a ballot.",
        "Offers a cost-effective and scalable solution for election management, optimizing resource allocation and reducing administrative overhead."
    ];

    const partnerships = [
        { name: "National Election Commission (Example)", logo: null },
        { name: "Ministry of Digital Governance (Example)", logo: null },
        { name: "Center for Civic Innovation (Example)", logo: null },
    ];

    const faq = [
        {
            question: "How does QRVotify guarantee the security of my personal information?",
            answer: "QRVotify employs state-of-the-art encryption and secure QR code technology. Your personal data is encrypted end-to-end and protected by robust security protocols, ensuring confidentiality and integrity."
        },
        {
            question: "What advantages does QRVotify offer to voters?",
            answer: "Voters benefit from a swift and hassle-free verification process at polling stations, significantly reducing wait times. The secure nature of the system also provides greater confidence in the integrity of the election."
        },
        {
            question: "What contingency plans are in place if a QR code fails to scan?",
            answer: "Our system incorporates robust fallback mechanisms. Trained election officials will have secure alternative methods for voter verification, such as using the voter's national ID or other approved identification documents."
        },
        {
            question: "Does QRVotify retain any record of my vote?",
            answer: "Absolutely not. QRVotify is solely designed for voter verification and does not collect, store, or transmit any information related to how an individual votes. The secrecy of your ballot is paramount."
        }
    ];

    return (
        <div className="bg-gray-50 text-gray-800 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-blue-700 mb-8">
                        Secure and Efficient Voter Verification with QRVotify
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed mb-10">
                        Revolutionizing elections through a transparent, secure, and user-friendly QR-based voter verification system.
                    </p>
                    <button
                        onClick={handleGetStartedClick}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Get Started
                    </button>
                </section>

                {/* Our Pillars Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <FaShieldAlt className="text-blue-500 text-4xl mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Uncompromising Security</h3>
                        <p className="text-gray-600 leading-relaxed">Advanced QR technology and robust encryption to safeguard every vote and voter's data.</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <FaChartLine className="text-green-500 text-4xl mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Enhanced Efficiency</h3>
                        <p className="text-gray-600 leading-relaxed">Streamlined verification processes for quicker, smoother, and more cost-effective elections.</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <FaUsers className="text-indigo-500 text-4xl mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Greater Accessibility</h3>
                        <p className="text-gray-600 leading-relaxed">Designed for ease of use, ensuring every eligible citizen can participate without verification hurdles.</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <FaLightbulb className="text-yellow-500 text-4xl mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovative Solution</h3>
                        <p className="text-gray-600 leading-relaxed">Pioneering the future of secure and reliable election technology with forward-thinking solutions.</p>
                    </div>
                </section>

                {/* Our Journey Section */}
                <section className="mb-20 bg-gray-100 rounded-xl shadow-md p-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-blue-700 mb-8">Our Journey: Building Trust in Elections</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Driven by a profound belief in democratic integrity, the founders of QRVotify recognized the urgent need for a more secure and efficient voter verification system. Witnessing the vulnerabilities of traditional methods, our team of dedicated technologists and civic innovators embarked on a mission to create a solution that would fundamentally enhance the trustworthiness of elections.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Our journey has been one of relentless dedication to security, innovation, and user experience. From initial concept to rigorous development and testing, we have collaborated closely with election administrators and cybersecurity experts to ensure that QRVotify not only meets the highest standards of security but also provides a seamless and reliable experience for both voters and election officials. We are proud to contribute to a future where every vote is verified with confidence.
                        </p>
                    </div>
                </section>

                {/* Security and Technology Deep Dive */}
                <section className="mb-20 bg-blue-50 rounded-xl shadow-md p-10">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">The Pillars of Our Secure Technology</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            At QRVotify, security is not just a feature; it's the foundation of our entire system. We employ a comprehensive and rigorously tested suite of technologies and protocols to ensure the absolute integrity and confidentiality of voter data:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6">
                            {securityDetails.map((detail, index) => (
                                <li key={index} className="mb-3 flex items-center">
                                    <FaCheckCircle className="mr-2 text-blue-500" />
                                    <span className="font-semibold">{detail}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            By combining cutting-edge encryption algorithms, dynamically generated QR codes, and stringent multi-factor authentication, QRVotify establishes an impenetrable shield against unauthorized access and manipulation. Our commitment to regular security audits and compliance with international data protection standards underscores our unwavering dedication to safeguarding the democratic process.
                        </p>
                    </div>
                </section>

                {/* Potential Impact and Statistics */}
                <section className="mb-20 bg-green-50 rounded-xl shadow-md p-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-green-700 mb-8">Realizing a More Trustworthy Electoral Landscape</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            While currently being strategically implemented, QRVotify is poised to deliver a transformative impact on the integrity and efficiency of elections worldwide:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6">
                            {potentialImpact.map((impact, index) => (
                                <li key={index} className="mb-3 flex items-center">
                                    <FaCheckCircle className="mr-2 text-green-500" />
                                    <span className="font-semibold">{impact}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We firmly believe that QRVotify will not only enhance the security and efficiency of voter verification but also play a crucial role in fostering greater public trust and participation in democratic processes. Our vision is a future where every election is conducted with the highest levels of integrity and transparency.
                        </p>
                    </div>
                </section>

                {/* Frequently Asked Questions (FAQ) */}
                <section className="mb-20 bg-gray-100 rounded-xl shadow-md p-10">
                    <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Have Questions? We Have Answers.</h2>
                    <div className="max-w-2xl mx-auto">
                        {faq.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm p-6 mb-6">
                                <h4 className="font-semibold text-gray-900 flex items-center mb-3">
                                    <FaQuestionCircle className="mr-3 text-blue-500" /> {item.question}
                                </h4>
                                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-24 bg-blue-700 rounded-xl shadow-lg text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-extrabold text-white mb-8">Ready to Secure Your Elections with QRVotify?</h2>
                        <p className="text-xl text-blue-100 leading-relaxed mb-10">
                            Join the growing movement towards transparent, efficient, and trustworthy electoral processes.
                        </p>
                        <button
                            onClick={handleGetStartedClick}
                            className="bg-white hover:bg-gray-100 text-blue-700 font-semibold py-4 px-10 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
                        >
                            Explore Implementation Options
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;