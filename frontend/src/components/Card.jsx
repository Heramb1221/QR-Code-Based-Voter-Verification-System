import React, { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { FiDownload } from "react-icons/fi";
import ECI from '../assets/ECI.png';
import IF from '../assets/IndianFlag.jpg';
import Us from '../assets/User.jpg';

const VoterCard = () => {
    const [voterData, setVoterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPrinting, setIsPrinting] = useState(false);
    const qrCodeRef = useRef(null);

    useEffect(() => {
        const fetchVoterData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No authentication token found");

                const response = await fetch("http://127.0.0.1:5000/api/voters/profile", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                    credentials: "include"
                });

                if (!response.ok) throw new Error("Failed to fetch voter data");
                const data = await response.json();
                setVoterData(data.voter || data);
            } catch (error) {
                console.error("Error fetching voter data:", error);
                setError(error.message);
                const mockVoterData = {
                    fullName: localStorage.getItem("userName") || "John Doe",
                    voterId: localStorage.getItem("voterId") || "AASBMDAAD",
                    dob: "1990-01-01",
                    gender: "Male",
                    fatherHusbandName: "James Doe",
                    hasVoted: false
                };
                setVoterData(mockVoterData);
            } finally {
                setLoading(false);
            }
        };
        fetchVoterData();
    }, []);

    const printDocument = () => {
        if (!voterData) return;
        
        setIsPrinting(true);

        try {
            // Get the QR code SVG from our rendered component
            const qrCodeSvg = document.querySelector('.qr-code-container svg');
            if (!qrCodeSvg) {
                throw new Error("QR Code element not found");
            }

            // Convert SVG to data URL for embedding
            const svgData = new XMLSerializer().serializeToString(qrCodeSvg);
            const qrCodeDataUrl = `data:image/svg+xml;base64,${btoa(svgData)}`;
            
            // Create a new iframe
            const printIframe = document.createElement('iframe');
            printIframe.style.display = 'none';
            document.body.appendChild(printIframe);
            
            // Get the iframe document and open it
            const printDocument = printIframe.contentDocument || printIframe.contentWindow.document;
            printDocument.open();
            
            // Prepare voter data for display
            const formattedDob = voterData.dob ? new Date(voterData.dob).toLocaleDateString("en-GB") : "N/A";
            const verificationUrl = voterData.voterId 
                ? `${window.location.origin}/verify/${voterData.voterId}`
                : `${window.location.origin}/verify/unknown`;
            
            // Write the HTML content directly to the iframe
            printDocument.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Voter ID Card - ${voterData.fullName || "Voter"}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            padding: 0;
                            background-color: white;
                        }
                        .card {
                            width: 450px;
                            height: 650px;
                            padding: 24px;
                            border: 4px solid #a0a0a0;
                            border-radius: 8px;
                            background-color: #f7f7f7;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                            position: relative;
                        }
                        .header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            border-bottom: 2px solid #808080;
                            padding-bottom: 12px;
                            margin-bottom: 12px;
                        }
                        .header img {
                            height: 48px;
                        }
                        .header-text {
                            text-align: center;
                        }
                        .header-title {
                            font-size: 18px;
                            font-weight: bold;
                            color: #333;
                            line-height: 1.2;
                        }
                        .header-subtitle {
                            font-size: 14px;
                            color: #666;
                            margin-top: 4px;
                        }
                        .photo-container {
                            display: flex;
                            justify-content: center;
                            margin-bottom: 16px;
                        }
                        .photo {
                            width: 128px;
                            height: 128px;
                            border: 4px solid #808080;
                            border-radius: 8px;
                            object-fit: cover;
                        }
                        .details {
                            font-size: 16px;
                            color: #333;
                        }
                        .details p {
                            margin: 8px 0;
                            word-break: break-word;
                        }
                        .details strong {
                            font-weight: bold;
                        }
                        .qr-container {
                            display: flex;
                            justify-content: center;
                            margin-top: 20px;
                        }
                        .signature-box {
                            width: 64%;
                            height: 32px;
                            background-color: #a0a0a0;
                            border-radius: 4px;
                            margin: 12px auto 0;
                        }
                        .footer {
                            position: absolute;
                            bottom: 16px;
                            text-align: center;
                            width: calc(100% - 48px);
                            font-size: 14px;
                            color: #666;
                        }
                        @media print {
                            body {
                                -webkit-print-color-adjust: exact;
                                print-color-adjust: exact;
                            }
                            .card {
                                box-shadow: none;
                                border: 4px solid #a0a0a0 !important;
                                page-break-inside: avoid;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <div class="header">
                            <img src="${ECI}" alt="ECI Logo" />
                            <div class="header-text">
                                <div class="header-title">
                                    आपका निर्वाचन आयोग <br />
                                    Election Commission of Yours
                                </div>
                                <div class="header-subtitle">मतदाता फोटो पहचान पत्र</div>
                            </div>
                            <img src="${IF}" alt="India Flag" />
                        </div>
                        
                        <div class="photo-container">
                            <img class="photo" src="${voterData.photoUrl || Us}" alt="User Photo" 
                                 onerror="this.onerror=null; this.src='${Us}';" />
                        </div>
                        
                        <div class="details">
                            <p><strong>निर्वाचक का नाम (Elector's Name):</strong> ${voterData.fullName || "N/A"}</p>
                            <p><strong>पिता / पति का नाम (Father/Husband's Name):</strong> ${voterData.fatherHusbandName || "N/A"}</p>
                            <p><strong>लिंग (Sex):</strong> ${voterData.gender || "N/A"}</p>
                            <p><strong>जन्म तिथि (Date of Birth):</strong> ${formattedDob}</p>
                            <p><strong>मतदाता पहचान संख्या (Voter ID):</strong> ${voterData.voterId || "N/A"}</p>
                        </div>
                        
                        <div class="qr-container">
                            <img src="${qrCodeDataUrl}" alt="QR Code" width="100" height="100" />
                        </div>
                        
                        <div class="signature-box"></div>
                        
                        <div class="footer">
                            <p>निर्वाचन आयोग द्वारा प्रमाणित (Certified by Election Commission)</p>
                        </div>
                    </div>
                </body>
                </html>
            `);
            
            printDocument.close();
            
            // Add event listener for after print
            printIframe.onload = function() {
                setTimeout(() => {
                    printIframe.contentWindow.focus();
                    printIframe.contentWindow.print();
                    
                    // Clean up after printing
                    setTimeout(() => {
                        document.body.removeChild(printIframe);
                        setIsPrinting(false);
                    }, 1000);
                }, 500);
            };
        } catch (error) {
            console.error("Error printing document:", error);
            alert("Error generating PDF: " + error.message);
            setIsPrinting(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error && !voterData) return <p>Error: {error}</p>;
    if (!voterData) return <p>No voter data available.</p>;

    const verificationUrl = voterData.voterId ?
        `${window.location.origin}/verify/${voterData.voterId}` :
        `${window.location.origin}/verify/unknown`;

    return (
        <div className="flex flex-col items-center">
            <div
                className="w-[450px] h-[650px] p-6 rounded-lg shadow-xl border-4 border-gray-400 bg-gray-100 relative"
            >
                <div className="flex justify-between items-center border-b-2 border-gray-500 pb-3 mb-3">
                    <img src={ECI} alt="ECI Logo" className="h-12" />
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-gray-800 leading-tight">
                            आपका निर्वाचन आयोग <br />
                            Election Commission of Yours
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">मतदाता फोटो पहचान पत्र</p>
                    </div>
                    <img src={IF} alt="India Flag" className="h-12" />
                </div>

                <div className="flex justify-center mb-4">
                    <img
                        src={voterData.photoUrl ? voterData.photoUrl : Us}
                        alt="User"
                        className="w-32 h-32 rounded-lg border-4 border-gray-500 object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src=Us }}
                    />
                </div>

                <div className="text-md text-gray-800 space-y-2">
                    <p className="break-words">
                        <strong>निर्वाचक का नाम (Elector's Name):</strong>{" "}
                        {voterData.fullName || "N/A"}
                    </p>
                    <p className="break-words">
                        <strong>पिता / पति का नाम (Father/Husband's Name):</strong>{" "}
                        {voterData.fatherHusbandName || "N/A"}
                    </p>
                    <p>
                        <strong>लिंग (Sex):</strong> {voterData.gender || "N/A"}
                    </p>
                    <p>
                        <strong>जन्म तिथि (Date of Birth):</strong> {voterData.dob ? new Date(voterData.dob).toLocaleDateString("en-GB") : "N/A"}
                    </p>
                    <p className="break-words">
                        <strong>मतदाता पहचान संख्या (Voter ID):</strong> {voterData.voterId || "N/A"}
                    </p>
                </div>

                <div className="flex justify-center mt-5 qr-code-container" ref={qrCodeRef}>
                    <QRCode value={verificationUrl} size={100} />
                </div>

                <div className="flex justify-center mt-3">
                    <div className="w-64 h-8 bg-gray-400 rounded-sm"></div>
                </div>

                <div className="absolute bottom-4 text-sm text-gray-700 text-center w-full">
                    <p>निर्वाचन आयोग द्वारा प्रमाणित (Certified by Election Commission)</p>
                </div>
            </div>

            <button
                onClick={printDocument}
                disabled={isPrinting}
                className={`mt-6 px-5 py-3 ${isPrinting ? 'bg-blue-400' : 'bg-blue-700 hover:bg-blue-800'} text-white font-bold rounded-lg shadow-md flex items-center transition duration-300`}
            >
                <FiDownload className="mr-2" /> 
                {isPrinting ? "Preparing PDF..." : "Download as PDF"}
            </button>

            {voterData && typeof voterData.hasVoted === 'boolean' && (
                <div className={`mt-4 px-4 py-2 text-white text-lg font-bold rounded-lg ${voterData.hasVoted ? "bg-green-500" : "bg-red-500"}`}>
                    {voterData.hasVoted ? "VOTED" : "NOT VOTED"}
                </div>
            )}
        </div>
    );
};

export default VoterCard;