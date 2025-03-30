import React, { useState } from "react";
import { MapPin, Search, FileText } from "lucide-react";
import officerIcon from "../assets/location.png"; // Using uploaded image
import documentsIcon from "../assets/documents.png"; // Placeholder for documents section

const officersData = [
  { id: 1, name: "Officer A", location: "Delhi, India", contact: "9876543210" },
  { id: 2, name: "Officer B", location: "Mumbai, India", contact: "8765432109" },
  { id: 3, name: "Officer C", location: "Kolkata, India", contact: "7654321098" },
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = officersData.filter((officer) =>
      officer.location.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOfficers(filtered);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Heading Section with Background & Image */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg flex items-center gap-3">
        <img src={officerIcon} alt="Find Officer" className="w-10 h-10" />
        <h2 className="text-2xl font-semibold">Find Your Election Officer</h2>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <input
          type="text"
          placeholder="Search by location..."
          value={search}
          onChange={handleSearch}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex justify-center items-center">
          <Search className="w-5 h-5" />
        </button>
      </div>
      
      {/* Officer List */}
      <ul className="space-y-4 mt-4">
        {filteredOfficers.length > 0 ? (
          filteredOfficers.map((officer) => (
            <li key={officer.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{officer.name}</h3>
              <p className="text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> {officer.location}
              </p>
              <p className="text-gray-700">Contact: {officer.contact}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No officers found for this location.</p>
        )}
      </ul>

      {/* Required Documents Section with Background & Image */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <img src={documentsIcon} alt="Documents" className="w-10 h-10" />
          <h3 className="text-xl font-semibold">Required Documents for Voter Registration</h3>
        </div>
        <ul className="space-y-3 mt-3">
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
