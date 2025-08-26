import { useRef, useState } from "react";

interface PdfVerifyUploadProps {
    onVerify?: (files: File[]) => void;
    loading?: boolean;
}

export const PdfVerifyUpload: React.FC<PdfVerifyUploadProps> = ({ onVerify, loading }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            const acceptedFiles = Array.from(e.dataTransfer.files).filter(
                (file) =>
                    file.type === "application/pdf" ||
                    file.type === "image/png" ||
                    file.type === "image/jpeg"
            );
            setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
        }
    };

    const handleVerify = () => {
        if (selectedFiles.length === 0) return;
        if (onVerify) onVerify(selectedFiles);
        setSelectedFiles([]);
    };

    return (
        <div className="p-4 text-gray-700 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-6">Verify Booking</h2>

            {/* Upload Section */}
            <div
                className="w-full max-w-2xl h-48 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition mb-6"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <input
                    type="file"
                    accept="application/pdf,image/png,image/jpeg"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                />
                <div className="flex flex-col items-center justify-center text-gray-500">
                    <span className="text-4xl mb-2">+</span>
                    <span>Click or drag PDFs here for verification</span>
                </div>
            </div>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
                <div className="w-full max-w-2xl mb-4">
                    <h4 className="font-semibold mb-2">Selected Files:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                        {selectedFiles.map((file, idx) => (
                            <li key={idx}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Verify Button */}
            <button
                className={`px-6 py-2 bg-orange-500 text-black rounded hover:bg-orange-600 transition flex items-center justify-center`}
                onClick={handleVerify}
                disabled={selectedFiles.length === 0 || loading}
            >
                {loading ? (
                    <svg
                        className="animate-spin h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                ) : (
                    "Verify"
                )}
            </button>
        </div>
    );
};