import React, { useState, useCallback } from "react";
import { MapPin, Search } from "lucide-react";
import officerIcon from "../assets/location.png";
import documentsIcon from "../assets/documents.png";
import { debounce } from 'lodash';

const officersData = [
    {
        _id: '67e70585988887ac0899134a',
        name: "Heramb Chaudhari",
        email: "hchaudhari1221@gmail.com",
        city: "Mumbai",
        telephone: "9876543210",
        officerId: "OFFICER-001",
        officeAddress: "123, Admin Street, Mumbai",
        role: "admin",
        createdAt: "2025-03-28T20:24:37.168+00:00",
        updatedAt: "2025-03-28T20:24:37.168+00:00",
        __v: 0
    },
    {
        _id: '67eae56564a920ce7871dd46',
        name: "Jayesh Khairnar",
        email: "jayeshkhairnar@gmail.com",
        city: "Kolkata",
        telephone: "9346452480",
        officerId: "OFFICER-003",
        officeAddress: "789, Admin Street, Kolkata",
        role: "admin",
        createdAt: "2025-03-31T18:56:37.202+00:00",
        updatedAt: "2025-03-31T18:56:37.202+00:00",
        __v: 0
    },
    {
        _id: '67eae624ad3f5a1bfc235a88',
        name: "Lokesh Chaudhari",
        email: "lchaudhari@gmail.com",
        city: "Delhi",
        telephone: "7862589542",
        officerId: "OFFICER-002",
        officeAddress: "456, Admin Street, Delhi",
        role: "admin",
        createdAt: "2025-03-31T18:59:48.181+00:00",
        updatedAt: "2025-03-31T18:59:48.181+00:00",
        __v: 0
    },
    {
        _id: '67eae6969a7b5d9c47763d9b',
        name: "Sujal Bhoi",
        email: "Bhoisujal@gmail.com",
        city: "Chennai",
        telephone: "8954235462",
        officerId: "OFFICER-004",
        officeAddress: "101112, Admin Street, Chennai",
        role: "admin",
        createdAt: "2025-03-31T19:01:42.125+00:00",
        updatedAt: "2025-03-31T19:01:42.125+00:00",
        __v: 0
    }
];

const requiredDocuments = [
    { name: "Voter ID Card", type: "Hardcopy & Softcopy", mandatory: true },
    { name: "Aadhaar Card", type: "Hardcopy & Softcopy", mandatory: true },
    { name: "PAN Card", type: "Softcopy (Optional)", mandatory: false },
    { name: "Profile Picture", type: "Softcopy (JPEG/PNG)", mandatory: true },
];

const FindOfficerPage = () => {
    const [search, setSearch] = useState("");
    const [filteredOfficers, setFilteredOfficers] = useState(officersData);

    const filterOfficers = useCallback((searchTerm) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const filtered = officersData.filter((officer) =>
            officer.city.toLowerCase().includes(lowerSearchTerm) ||
            officer.name.toLowerCase().includes(lowerSearchTerm) ||
            officer.officerId.toLowerCase().includes(lowerSearchTerm)
        );
        setFilteredOfficers(filtered);
    }, []);

    // Debounce the filter function
    const debouncedFilter = useCallback(debounce(filterOfficers, 300), [filterOfficers]);

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        debouncedFilter(searchTerm);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Heading Section with Background & Image */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-5 rounded-lg flex items-center gap-4">
                <img src={officerIcon} alt="Find Officer" className="w-12 h-12" />
                <h2 className="text-2xl font-semibold">Find Your Election Officer</h2>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2 mt-5">
                <input
                    type="text"
                    placeholder="Search by name, city, or ID (e.g., Mumbai, Officer-002, Heramb)"
                    value={search}
                    onChange={handleSearch}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Officer List */}
            <ul className="space-y-4 mt-6">
                {filteredOfficers.length > 0 ? (
                    filteredOfficers.map((officer) => (
                        <li key={officer._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200">
                            <h3 className="text-lg font-semibold mb-2">{officer.name}</h3>
                            <div className="flex items-center text-gray-600 mb-1">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{officer.city}, India</span>
                            </div>
                            <p className="text-gray-700 mb-1">Officer ID: <span className="font-medium">{officer.officerId}</span></p>
                            <p className="text-gray-700 mb-1">Contact: <span className="font-medium">{officer.telephone}</span></p>
                            <p className="text-gray-700 text-sm italic">Office: {officer.officeAddress}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 italic mt-2">No officers found matching your search criteria. Please try a different keyword.</p>
                )}
            </ul>

            {/* Required Documents Section with Background & Image */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-3">
                    <img src={documentsIcon} alt="Documents" className="w-10 h-10" />
                    <h3 className="text-xl font-semibold">Required Documents for Voter Registration</h3>
                </div>
                <ul className="space-y-3">
                    {requiredDocuments.map((doc, index) => (
                        <li key={index} className="border p-3 rounded-md bg-white">
                            <strong>{doc.name}</strong> - <span className="text-gray-600">{doc.type}</span>{" "}
                            {doc.mandatory && <span className="text-red-500 font-semibold">(Mandatory)</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FindOfficerPage;