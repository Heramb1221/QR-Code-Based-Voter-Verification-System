import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    FaFacebookSquare,
    FaTwitterSquare,
    FaInstagramSquare,
    FaYoutubeSquare,
    FaLinkedin,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaMobileAlt,
    FaFileAlt,
    FaChartBar,
    FaInfoCircle,
    FaUserFriends,
    FaLock // Import FaLock here
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const visitorCount = 123456; // Hardcoded dummy data

    const quickLinks = [
        { to: "/", text: "Home" },
        { to: "/about", text: "About Us" },
        { to: "/find-officers", text: "Find Officers" },
        { to: "/voter-guide", text: "Voter Guide" },
        { to: "/faq", text: "FAQ" },
        { to: "/elections-calendar", text: "Elections Calendar" },
        { to: "/news", text: "Election News" },
        { to: "/contact", text: "Contact" },
    ];

    const resources = [
        { to: "/help-center", text: "Help Center", icon: <FaFileAlt className="mr-2 text-yellow-400" /> },
        { to: "/registration-checklist", text: "Registration Checklist", icon: <FaFileAlt className="mr-2 text-yellow-400" /> },
        { to: "/required-documents", text: "Required Documents", icon: <FaFileAlt className="mr-2 text-yellow-400" /> },
        { to: "/accessibility", text: "Accessibility", icon: <FaInfoCircle className="mr-2 text-yellow-400" /> },
        { to: "/downloads/voter-handbook.pdf", text: "Voter Handbook", icon: <FaFileAlt className="mr-2 text-yellow-400" />, isExternal: true },
        { to: "/security", text: "Security Information", icon: <FaLock className="mr-2 text-yellow-400" /> },
    ];

    const updates = [
        { to: "/elections", text: "Elections Information", icon: <FaFileAlt className="mr-2 text-yellow-400" /> },
        { to: "/results", text: "View Results", icon: <FaChartBar className="mr-2 text-yellow-400" /> },
        { to: "/reports", text: "View Report", icon: <FaInfoCircle className="mr-2 text-yellow-400" /> },
    ];

    const mobileApps = [
        { href: "#", text: "Voter Helpline App", icon: <FaMobileAlt className="mr-2 text-yellow-400" /> },
        { href: "#", text: "Saksham App", icon: <FaMobileAlt className="mr-2 text-yellow-400" /> },
        { href: "#", text: "cVIGIL App", icon: <FaMobileAlt className="mr-2 text-yellow-400" /> },
        { href: "#", text: "Voter Turnout App", icon: <FaMobileAlt className="mr-2 text-yellow-400" /> },
    ];

    const contactInfo = [
        { icon: <FaPhone className="mr-2 mt-1 text-yellow-400" />, text: <span>1950 (Toll-free Number)<br/>(800) 123-VOTE</span> },
        { icon: <FaEnvelope className="mr-2 mt-1 text-yellow-400" />, text: <span>complaints@eci.gov.in<br/>support@qrvotify.gov</span> },
        { icon: <FaMapMarkerAlt className="mr-2 mt-1 text-yellow-400" />, text: <span>Election Commission Of India,<br/>Nirvachan Sadan, Ashoka Road,<br/>New Delhi 110001</span> },
        { icon: <FaUserFriends className="mr-2 mt-1 text-yellow-400" />, text: <span>Visitor Count: <strong>{visitorCount.toLocaleString()}</strong></span> },
    ];

    const bottomLinks = [
        { to: "/privacy-policy", text: "Privacy Policy" },
        { to: "/terms-of-service", text: "Terms of Service" },
        { to: "/accessibility-statement", text: "Accessibility" },
        { to: "/sitemap", text: "Sitemap" },
    ];

    return (
        <footer className="bg-[#19567C] text-white py-10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
                    {/* About Section - Centered Text */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold mb-5">About QRVotify</h3>
                        <p className="text-gray-300 leading-relaxed mb-5">
                            QRVotify is a secure and reliable QR-based voter verification system ensuring transparency in elections. The system is responsible for administering voter verification processes.
                        </p>
                        <Link to="/about" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                            Read more
                        </Link>
                        <div className="flex justify-center md:justify-start space-x-4 mt-5">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                                <FaFacebookSquare size={24} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                                <FaTwitterSquare size={24} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                                <FaInstagramSquare size={24} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                                <FaYoutubeSquare size={24} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links - Grid Layout */}
                    <div>
                        <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
                        <ul className="grid grid-cols-2 gap-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink to={link.to} className="text-gray-300 hover:text-yellow-400">{link.text}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources & Updates - Combined Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-5">Resources & Updates</h3>
                        <h4 className="text-lg font-semibold mb-3 text-gray-300">Resources</h4>
                        <ul className="space-y-2">
                            {resources.map((resource, index) => (
                                <li key={index} className="flex items-center">
                                    {resource.icon}
                                    {resource.isExternal ? (
                                        <a href={resource.to} className="text-gray-300 hover:text-yellow-400" target="_blank" rel="noopener noreferrer">{resource.text}</a>
                                    ) : (
                                        <Link to={resource.to} className="text-gray-300 hover:text-yellow-400">{resource.text}</Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <h4 className="text-lg font-semibold mt-4 mb-3 text-gray-300">Updates</h4>
                        <ul className="space-y-2">
                            {updates.map((update, index) => (
                                <li key={index} className="flex items-center">
                                    {update.icon}
                                    <Link to={update.to} className="text-gray-300 hover:text-yellow-400">{update.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Apps - Split Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-5">Contact & Apps</h3>
                        <h4 className="text-lg font-semibold mb-3 text-gray-300">Contact Us</h4>
                        <ul className="space-y-2 text-gray-300">
                            {contactInfo.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    {item.icon}
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <h4 className="text-lg font-semibold mt-4 mb-3 text-gray-300">Mobile Apps</h4>
                        <ul className="space-y-2">
                            {mobileApps.map((app, index) => (
                                <li key={index} className="flex items-center">
                                    {app.icon}
                                    <a href={app.href} className="text-gray-300 hover:text-yellow-400">{app.text}</a>
                                </li>
                            ))}
                        </ul>
                        <Link to="/contact-us" className="inline-block mt-4 bg-yellow-400 text-[#19567C] px-4 py-2 rounded font-medium hover:bg-yellow-300 transition">
                            Submit Inquiry
                        </Link>
                    </div>
                </div>

                <hr className="border-gray-600 my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
                    <div className="mb-3 md:mb-0">
                        <p>&copy; {currentYear} QRVotify. All rights reserved.</p>
                    </div>
                    <div className="flex flex-wrap justify-center space-x-4">
                        {bottomLinks.map((link, index) => (
                            <Link key={index} to={link.to} className="hover:text-yellow-400">{link.text}</Link>
                        ))}
                    </div>
                </div>

                <div className="mt-6 text-xs text-center text-gray-400">
                    <p>QRVotify is an official government service. Unauthorized use is prohibited and subject to penalties under law.</p>
                    <p className="mt-2">This website is maintained by the Election Commission of India.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;