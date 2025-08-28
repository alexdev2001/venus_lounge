import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import background from "../../assets/Pattern-green.svg";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setIsError(false);

        try {
            const response = await fetch("http://localhost:3003/request-reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to send reset email");
            }

            setMessage("If this email exists, a reset link was sent!");
            setTimeout(() => {
                setLoading(false)
                navigate("/login");
                }
                , 3000);
        } catch (err: unknown) {
            setIsError(true);
            if (err instanceof Error) {
                setMessage(err.message);
            } else {
                setMessage("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-full my-text">
            <button
                onClick={() => navigate("/login")}
                className="absolute top-6 left-6 z-50 flex items-center justify-center p-3 rounded-full bg-white bg-opacity-80 shadow-lg hover:bg-opacity-100 transition"
            >
                <FaArrowLeft className="text-3xl text-orange-600" />
            </button>

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
                            Forgot Password
                        </h2>

                        <form className="flex flex-col gap-4" onSubmit={handleForgotPassword}>
                            <div>
                                <label className="block text-gray-700 text-left font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={`mt-4 py-3 font-semibold rounded-lg transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </button>
                        </form>

                        {message && (
                            <div className={`mt-4 p-3 rounded-lg ${isError ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}