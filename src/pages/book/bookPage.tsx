import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import background from "../../assets/Pattern-green.svg";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

export default function BookPage() {
    const navigate = useNavigate();

    const [startTime, setStartTime] = useState<Date | null>(new Date());
    const [endTime, setEndTime] = useState<Date | null>(new Date());
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);

    const handleSubmitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setMessage(null);
        setIsError(false);

        try {
            const submissionResponse = await fetch('https://venus-lounge-backend.onrender.com/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    fullName: fullname,
                    email: email,
                    start_time: startTime,
                    end_time: endTime,
                }),
            });

            const result = await submissionResponse.json();
            console.log(result);

            if (!submissionResponse.ok) {
                throw new Error(result.message || "Submission failed");
            }

            setMessage("Booking successful! Check your email...");
            setLoading(false);

            setTimeout(() => {
                navigate("/");
            }, 7000);

        } catch (err: unknown) {
            setIsError(true);
            if (err instanceof Error) {
                setMessage(err.message);
            } else {
                setMessage("An unexpected error occurred");
            }
            setLoading(false);
        }
    }

    return (
        <div className="relative h-screen w-full">
            {/* Back Arrow */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 z-50 flex items-center justify-center p-3 rounded-full bg-white bg-opacity-80 shadow-lg hover:bg-opacity-100 transition"
            >
                <FaArrowLeft className="text-3xl text-orange-600" />
            </button>

            {/* Booking Section */}
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
                <div className="flex w-full flex-col my-text items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 sm:p-12 max-w-[800px] w-full">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
                            Book Your Spot
                        </h2>

                        <form className="flex flex-col gap-4" onSubmit={handleSubmitBooking}>
                            <div>
                                <label className="block text-gray-700 text-left font-medium mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-left font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1 text-left">Start Time</label>
                                    <DateTimePicker
                                        value={startTime}
                                        onChange={(date) => setStartTime(date)}
                                        className="w-full"
                                        required
                                        disableClock={false}
                                        format="dd-MM-y h:mm a"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1 text-left">End Time</label>
                                    <DateTimePicker
                                        value={endTime}
                                        onChange={(date) => setEndTime(date)}
                                        className="w-full"
                                        required
                                        disableClock={false}
                                        format="dd-MM-y h:mm a"
                                    />
                                </div>
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
                                        Submitting...
                                    </span>
                                ) : (
                                    "Confirm Booking"
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