import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import background from "../../assets/Pattern-green.svg";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import {useEffect, useState} from "react";
import SlotVisualizer from "../../../ui/components/SlotVisualizer";
import bookingGif from '../../assets/email.gif';

interface Booking {
    id?: number;
    fullName?: string;
    email: string;
    packageType: "silver" | "gold" | "platinum";
    numPeople: number;
    start_time: Date;
    end_time: Date;
    qr_code?: string | null;
    status?: "pending" | "verified" | "past due";
}

export default function BookPage() {
    const navigate = useNavigate();

    const [startTime, setStartTime] = useState<Date | null>(new Date());
    const [endTime, setEndTime] = useState<Date | null>(new Date());
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);
    const [packageType, setPackageType] = useState<"silver" | "gold" | "platinum">("silver");
    const [numPeople, setNumPeople] = useState(1);
    const [showSlots, setShowSlots] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false)
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );
    const [showInstructions, setShowInstructions] = useState(false);

    const packageLimits = {
        silver: { maxPeople: 3, maxHours: 2, extras: "2 hours max, 1-3 people" },
        gold: { maxPeople: 9, maxHours: 4, extras: "4 hours max, 1-9 people" },
        platinum: { maxPeople: 100, maxHours: 8, extras: "8 hours max, 10+ people, includes free bottle" },
    };

    const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        const max = packageLimits[packageType].maxPeople;
        if (value > max) {
            setNumPeople(max);
        } else {
            setNumPeople(value);
        }
    };

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
                    packageType,
                    numPeople,
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

    const handleEndTimeChange = (date: Date | null) => {
        if (!date || !startTime) return;
        const maxHours = packageLimits[packageType].maxHours;
        const hours = (date.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        if (hours > maxHours) {
            setEndTime(new Date(startTime.getTime() + maxHours * 60 * 60 * 1000));
        } else {
            setEndTime(date);
        }
    };

    const fetchBookings = async () => {
        setLoadingSlots(true);
        try {
            const res = await fetch("https://venus-lounge-backend.onrender.com/bookings");
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();
            setBookings(data.allBookings);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingSlots(false);
        }
    };




    useEffect(() => {
        if (showSlots) {
            fetchBookings();
        }
    }, [showSlots]);

    return (
        <div className="relative h-screen w-full">
            {/* Back Arrow */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 z-50 flex items-center justify-center p-3 rounded-full bg-white bg-opacity-80 shadow-lg hover:bg-opacity-100 transition"
            >
                <FaArrowLeft className="text-3xl text-orange-600" />
            </button>
            <div className="absolute top-6 right-6 flex space-x-2 z-50">
                <button
                    type="button"
                    onClick={() => setShowSlots(true)}
                    className="py-2 px-4 bg-green-600 text-orange-600 rounded-lg shadow-lg hover:bg-green-700 transition"
                >
                    Preview Slots
                </button>

                <button
                    type="button"
                    onClick={() => setShowInstructions(true)}
                    className="py-2 px-3 bg-gray-200 text-orange-600 rounded-lg shadow-lg hover:bg-gray-300 transition font-bold text-lg"
                    title="Instructions"
                >
                    ?
                </button>
            </div>

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

                            <div>
                                <label className="block text-gray-700 text-left font-medium mb-1">Package Type</label>
                                <select
                                    value={packageType}
                                    onChange={(e) => setPackageType(e.target.value as "silver" | "gold" | "platinum")}
                                    className="w-full px-4 py-2 border rounded-lg"
                                >
                                    <option value="silver">Silver</option>
                                    <option value="gold">Gold</option>
                                    <option value="platinum">Platinum</option>
                                </select>
                                <p className="text-sm text-gray-500 mt-1">{packageLimits[packageType].extras}</p>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1 text-left">Number of People</label>
                                <input
                                    type="number"
                                    value={numPeople}
                                    onChange={handlePeopleChange}
                                    min={1}
                                    max={packageLimits[packageType].maxPeople}
                                    className="w-full px-4 py-2 border rounded-lg"
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
                                        onChange={handleEndTimeChange}
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

            {showSlots && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-3xl relative">
                        <button
                            onClick={() => setShowSlots(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>


                        {/* Title + Date Selector */}
                        <div className="flex flex-col items-center mb-6">
                            <h3 className="text-xl font-bold mb-2">Available Slots</h3>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        {/* Slot Graphic */}
                        {loadingSlots ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="h-80 w-full">
                                <SlotVisualizer bookings={bookings} selectedDate={selectedDate} />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {showInstructions && (
                <div className="fixed inset-0 bg-black/40 my-text backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-md relative flex flex-col items-center">
                        <button
                            onClick={() => setShowInstructions(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>

                        <img
                            src={bookingGif}
                            alt="Instructions for booking"
                            className="w-32 h-auto mb-4"
                        />

                        <h3 className="text-xl font-bold mb-4 text-center">Booking Instructions</h3>

                        {/* The unordered list (<ul>) is replaced with an ordered list (<ol>) */}
                        <ol className="list-decimal text-left pl-5 space-y-2 text-gray-700">
                            <li>Enter your name</li>
                            <li>Enter the destination email where booking document is received.</li>
                            <li>Select your desired package type and the number of people within the package.</li>
                            <li>Click "Preview Slots" to see available times before selecting start and end times.</li>
                            <li>Pick a start and end time within the package limits.</li>
                            <li>Ensure your email is correct to receive confirmation.</li>
                            <li>Click "Confirm Booking" to finalize your reservation.</li>
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}