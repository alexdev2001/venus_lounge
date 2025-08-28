import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import background from "../../assets/Pattern-green.svg";
import { useState } from "react";

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // retrieve reset token from URL

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);

    // derived validation state
    const passwordsMatch = password && confirmPassword && password === confirmPassword;

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setIsError(false);

        if (!passwordsMatch) {
            setMessage("Passwords do not match");
            setIsError(true);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3003/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Password reset failed");
            }

            setMessage("Password reset successful! Redirecting to login...");
            setLoading(false);

            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (err: unknown) {
            setIsError(true);
            if (err instanceof Error) {
                setMessage(err.message);
            } else {
                setMessage("An unexpected error occurred");
            }
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-full my-text">
            {/* Back Arrow */}
            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 z-50 flex items-center justify-center p-3 rounded-full bg-white bg-opacity-80 shadow-lg hover:bg-opacity-100 transition"
            >
                <FaArrowLeft className="text-3xl text-orange-600" />
            </button>

            {/* Reset Password Section */}
            <section
                className="h-full w-full px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-24"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "repeat",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="flex w-full flex-col items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 sm:p-12 max-w-[500px] w-full">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
                            Reset Password
                        </h2>

                        <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
                            {/* New Password */}
                            <div>
                                <label className="block text-gray-700 text-left font-medium mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-gray-700 text-left font-medium mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                        confirmPassword && !passwordsMatch
                                            ? "border-red-500 focus:ring-red-500"
                                            : "focus:ring-orange-500"
                                    }`}
                                    required
                                />
                                {confirmPassword && !passwordsMatch && (
                                    <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                                )}
                                {confirmPassword && passwordsMatch && (
                                    <p className="text-green-600 text-sm mt-1">Passwords match</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`mt-2 py-3 font-semibold rounded-lg transition ${
                                    loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-orange-600 hover:bg-orange-700"
                                }`}
                                disabled={loading || !passwordsMatch}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin h-5 w-5 mr-2 text-white"
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
                                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                            ></path>
                                        </svg>
                                        Resetting...
                                    </span>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </form>

                        {message && (
                            <div
                                className={`mt-4 p-3 rounded-lg ${
                                    isError
                                        ? "bg-red-200 text-red-800"
                                        : "bg-green-200 text-green-800"
                                }`}
                            >
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}