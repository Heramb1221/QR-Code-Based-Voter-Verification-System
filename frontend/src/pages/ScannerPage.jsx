import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const lockUnlockVoter = async (voterData, action) => {
    try {
        console.log(`${action} voter:`, voterData);
        toast.success(`${action.charAt(0).toUpperCase() + action.slice(1)} successful!`);
        return true;
    } catch (error) {
        toast.error(`Error during ${action}: ${error.message}`);
        return false;
    }
};

const ScannerPage = () => {
    const [scanResult, setScanResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [cameraPermission, setCameraPermission] = useState("pending");
    const [scanning, setScanning] = useState(true);
    const navigate = useNavigate();
    const scanTimeout = useRef(null);
    const lockUnlockLoading = useRef(false);

    const handleScan = (result) => {
        if (result && scanning) {

            setScanning(false);

            setIsLoading(true);

            const data = result?.text || result;
            console.log("Scan successful:", data);
            setScanResult({ text: data });

            if (scanTimeout.current) {
                clearTimeout(scanTimeout.current);
            }

            scanTimeout.current = setTimeout(() => {
                setIsLoading(false);
                toast.success("QR Code scanned successfully!");
            }, 1000);
        }
    };

    const handleError = (err) => {
        console.error("QR Scanner Error:", err);
        setCameraPermission("denied");
        toast.error("Error accessing camera. Please check permissions.");
    };

    const handleLockUnlock = async (action) => {
        if (!scanResult) return;

        lockUnlockLoading.current = true;
        try {
            if (action === "lock") {
                const success = await lockUnlockVoter(scanResult, "lock");
                if (success) {
                    setIsLocked(true);
                }
            } else if (action === "unlock") {
                const success = await lockUnlockVoter(scanResult, "unlock");
                if (success) {
                    setIsLocked(false);
                }
            }
        } catch (error) {
            console.error(`Error in ${action}:`, error);
            toast.error(`Failed to ${action} voter`);
        } finally {
            lockUnlockLoading.current = false;
        }
    };

    const resetScan = () => {
        setScanResult(null);
        setIsLocked(false);
        setScanning(true);

        if (scanTimeout.current) {
            clearTimeout(scanTimeout.current);
            scanTimeout.current = null;
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="text-center text-blue-700 font-bold text-3xl mb-6">
                <h1>QRVotify Election Verification</h1>
            </div>

            <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-gray-400">
                {!scanResult ? (
                    <>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-center mb-2">Scan Voter QR Code</h2>
                            {scanning && (
                                <QrReader
                                    constraints={{
                                        facingMode: "environment"
                                    }}
                                    onResult={handleScan}
                                    containerStyle={{ width: "100%", borderRadius: "8px" }}
                                    videoStyle={{ width: "100%", height: "auto" }}
                                    scanDelay={500}
                                    videoId="qr-reader-video"
                                />
                            )}

                            {cameraPermission === "denied" && (
                                <div className="mt-2 text-red-500 text-center text-sm">
                                    Camera access denied. Please check your browser permissions.
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="mt-4">
                        <div className="text-lg font-semibold text-gray-700 mb-2">Scan Result:</div>
                        <div className="p-4 bg-white rounded-md shadow-inner mb-4">
                            <div className="text-sm text-gray-600">Voter ID: {scanResult.text}</div>
                        </div>

                        <div className={`p-2 rounded-md ${isLocked ? 'bg-red-500' : 'bg-green-500'} text-white text-center mb-4`}>
                            {isLocked ? "Voter is Locked" : "Voter is Unlocked"}
                        </div>

                        <div className="flex gap-4 mb-4">
                            <button
                                className="w-1/2 bg-red-600 text-white p-3 rounded-md font-semibold hover:bg-red-700 transition-all duration-300 disabled:opacity-50"
                                onClick={() => handleLockUnlock("lock")}
                                disabled={isLocked || lockUnlockLoading.current}
                            >
                                {lockUnlockLoading.current ? "Loading..." : "Lock Voter"}
                            </button>
                            <button
                                className="w-1/2 bg-green-600 text-white p-3 rounded-md font-semibold hover:bg-green-700 transition-all duration-300 disabled:opacity-50"
                                onClick={() => handleLockUnlock("unlock")}
                                disabled={!isLocked || lockUnlockLoading.current}
                            >
                                {lockUnlockLoading.current ? "Loading..." : "Unlock Voter"}
                            </button>
                        </div>

                        <button
                            className="w-full bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300"
                            onClick={resetScan}
                        >
                            Scan Another Code
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-6">
                <button
                    className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-700 transition-all duration-300"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
            </div>

            <ToastContainer position="bottom-center" />
        </div>
    );
};

export default ScannerPage;