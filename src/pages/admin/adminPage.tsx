import {useEffect, useState} from "react";
import { BookingTable } from "../../../ui/components/dashboard/BookingTable.tsx";
import {
    FaClipboardList,
    FaSignOutAlt,
    FaBars,
    FaUserCircle,
    FaCheckCircle, FaChevronDown, FaUsers, FaUserPlus, FaTimes,
} from "react-icons/fa";
import logo from "../../assets/logo_no_word.png"
import {useNavigate} from "react-router-dom";
import {PdfVerifyUpload} from "../../../ui/components/dashboard/PdfVerifyUpload.tsx";
import { jwtDecode } from "jwt-decode";
import UsersTable from "../../../ui/components/dashboard/UsersTable.tsx";

interface DecodedToken {
    id: number;
    username: string;
    roles: string[];
    iat: number;
    exp: number;
}

export type Booking = {
    id: number;
    fullName: string | null;
    email: string;
    start_time: string;
    end_time: string;
    qr_code: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

export default function AdminPage() {

    const navigate = useNavigate();
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [username, setUsername] = useState<string>("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [usersTableKey, setUsersTableKey] = useState(0);

    const [usernameInput, setUsernameInput] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("2");

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Track which page is currently active
    const [activePage, setActivePage] = useState<"bookings" | "verify" | "settings" | "users">("verify");
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // verification state
    const [verifying, setVerifying] = useState(false);
    const [verifyResults, setVerifyResults] = useState<{file: string, status: string, message: string}[] | null>(null);

    const openAddModal = () => setIsAddOpen(true);
    const closeAddModal = () => {
        setIsAddOpen(false);
        setUsernameInput("");
        setEmail("");
        setPassword("");
        setRole("ROLE_USER");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/", { replace: true });
            return;
        }

        try {
            const decoded: DecodedToken = jwtDecode(token);
            setUsername(decoded.username);

            if (decoded.roles.includes("ROLE_SUPERADMIN")) {
                setIsSuperAdmin(true);
            }
        } catch (err) {
            console.error("Failed to decode token", err);
            localStorage.removeItem("token");
            navigate("/", { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch("http://localhost:3003/bookings");
                if (response.ok) {
                    const data = await response.json();
                    setBookings([...data.allBookings].sort((a, b) => b.id - a.id));
                }
                console.log("something went wrong");
            } catch (e) {
                console.error(e);
            }
        }
        fetchBookings();
    }, [])


    const handleDelete = (id: number) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (deleteId === null) return;

        try {
            const response = await fetch(`http://localhost:3003/bookings/${deleteId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setBookings((prev) => prev.filter((b) => b.id !== deleteId));
            } else {
                console.error("Failed to delete booking");
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
        } finally {
            setDeleteId(null);
        }
    };

    const cancelDelete = () => {
        setDeleteId(null);
    };

    const handleAddUser = async () => {
        try {
            const response = await fetch("http://localhost:3003/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // ✅ important
                body: JSON.stringify({
                    username: usernameInput,
                    password: password,
                    email: email,
                    roleId: [parseInt(role)],
                }),
            });

            if (!response.ok) {
                console.log("something went wrong");
                return;
            }

            setIsAddOpen(false);
            setUsernameInput("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setRole("ROLE_ADMIN");
            setUsersTableKey((prev) => prev + 1);

        } catch (e) {
            console.error(e);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    // Render content based on active page
    const renderMainContent = () => {
        switch (activePage) {
            case "verify": {
                const verifiedBookings = bookings
                    .filter((b) => b.status === "verified")
                    .sort((a, b) => b.id - a.id);

                return (
                    <div className="flex flex-col items-start sm:items-center w-full">
                        <PdfVerifyUpload
                            onVerify={async (files) => {
                                setVerifying(true);
                                setVerifyResults(null);

                                const formData = new FormData();
                                files.forEach((file) => formData.append("files", file));

                                try {
                                    const token = localStorage.getItem("token");

                                    const response = await fetch("http://localhost:3003/bookings/verify", {
                                        method: "POST",
                                        headers: {
                                            "Authorization": `Bearer ${token}`,
                                        },
                                        body: formData,
                                    });

                                    if (response.ok) {
                                        const data = await response.json();

                                        if (data.results) {
                                            setVerifyResults(data.results);
                                        }

                                        const allBookings = await (
                                            await fetch("http://localhost:3003/bookings/")
                                        ).json();
                                        setBookings(allBookings.allBookings);
                                    } else {
                                        setVerifyResults([
                                            { file: "Unknown", status: "fail", message: "Verification failed" },
                                        ]);
                                    }
                                } catch (err) {
                                    console.error("Error verifying files:", err);
                                    setVerifyResults([
                                        { file: "Unknown", status: "fail", message: "Verification failed" },
                                    ]);
                                } finally {
                                    setVerifying(false);
                                    setTimeout(() => setVerifyResults(null), 5000);
                                }
                            }}
                            loading={verifying}
                        />

                        <div className="w-full mt-8">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                Recently Verified <FaChevronDown className="text-gray-500 text-sm" />
                            </h3>
                            <BookingTable bookings={verifiedBookings} onDelete={handleDelete} />
                        </div>
                    </div>
                );
            }
            case "bookings":
                return <BookingTable bookings={bookings}  onDelete={handleDelete} />;
            case "users":
                return (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <button
                                onClick={openAddModal}
                                className="flex items-center space-x-2 bg-orange-500 text-black px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
                            >
                                <FaUserPlus />
                                <span>Add User</span>
                            </button>
                        </div>
                        <div className="h-6"/>
                        <UsersTable key={usersTableKey} />

                        {isAddOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-opacity-30 backdrop-blur-sm"
                                    onClick={closeAddModal}
                                />
                                <div className="relative bg-white rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md z-10 shadow-lg animate-fadeIn">
                                    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                                        Add User
                                    </h2>

                                    <form
                                        className="space-y-4"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (password !== confirmPassword) {
                                                alert("Passwords do not match");
                                                return;
                                            }
                                            handleAddUser();
                                        }}
                                    >
                                        <div>
                                            <label className="block text-sm text-left font-medium text-gray-700 mb-1">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                value={usernameInput}
                                                onChange={(e) => setUsernameInput(e.target.value)}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-left font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-left font-medium text-gray-700 mb-1">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                            />
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <label className="block text-sm text-left font-medium text-gray-700 mb-1">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                                                ${confirmPassword && confirmPassword !== password
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-gray-300 focus:ring-orange-400"
                                                }`}
                                            />
                                            {confirmPassword && confirmPassword !== password && (
                                                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-left text-gray-700 mb-1">
                                                Role
                                            </label>
                                            <select
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                            >
                                                <option value="2">Admin</option>
                                                <option value="1">Super Admin</option>
                                            </select>
                                        </div>

                                        <div className="flex justify-end space-x-3 mt-4">
                                            <button
                                                type="button"
                                                onClick={closeAddModal}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    const getHeaderTitle = () => {
        switch (activePage) {
            case "bookings":
                return "Bookings";
            case "verify":
                return "Verify Bookings";
            default:
                return "verify";
        }
    };

    return (
        <div className="flex h-screen my-text">
            {/* Sidebar - hidden on mobile, slides in when toggled */}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-white flex-col border-r-4 border-gray-300 transform transition-transform duration-300 z-50
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static md:flex`}
            >
                {/* Mobile close button */}
                <div className="flex items-center justify-between h-16 border-b-4 border-gray-300 px-4 md:justify-center">
                    <img
                        src={logo}
                        alt="Admin Panel Logo"
                        className="h-12 w-auto"
                    />

                    {/* Close icon - only visible on mobile */}
                    <button
                        className="md:hidden text-gray-600"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <button
                        className={`flex items-center space-x-2 p-2 w-full text-left rounded transition
        ${activePage === "verify"
                            ? "text-orange-500 font-semibold"
                            : "hover:bg-orange-100 text-gray-700"}`}
                        onClick={() => setActivePage("verify")}
                    >
                        <FaCheckCircle
                            className={activePage === "verify" ? "text-orange-500" : "text-gray-700"}
                        />
                        <span>Verify</span>
                    </button>

                    <button
                        className={`flex items-center space-x-2 p-2 w-full text-left rounded transition
        ${activePage === "bookings"
                            ? " text-orange-500 font-semibold"
                            : "hover:bg-orange-100 text-gray-700"}`}
                        onClick={() => setActivePage("bookings")}
                    >
                        <FaClipboardList
                            className={activePage === "bookings" ? "text-orange-500" : "text-gray-700"}
                        />
                        <span>Bookings</span>
                    </button>

                    {isSuperAdmin && (
                        <button
                            className={`flex items-center space-x-2 p-2 w-full text-left rounded transition
          ${activePage === "users"
                                ? "text-orange-500 font-semibold"
                                : "hover:bg-orange-100 text-gray-700"}`}
                            onClick={() => setActivePage("users")}
                        >
                            <FaUsers
                                className={activePage === "users" ? "text-orange-500" : "text-gray-700"}
                            />
                            <span>Users</span>
                        </button>
                    )}
                </nav>

                <div className="p-4 border-t-4 border-gray-300 mt-auto mb-8">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 bg-orange-500 text-black px-3 py-2 rounded hover:bg-orange-600 transition"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div
                className={`flex flex-col flex-1 transition ${deleteId !== null ? "blur-sm" : ""}`}
            >
                {/* Header */}
                <header
                    className="flex items-center justify-between
             px-2 sm:px-4 md:px-6
             py-2 sm:py-3 md:py-4
             bg-white border-b-4 border-gray-300
             max-w-[320px] sm:max-w-none w-full ml-0"
                >
                    {/* Mobile sidebar toggle (only visible on mobile) */}
                    <button
                        className="md:hidden text-gray-600"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <FaBars size={22} />
                    </button>

                    {/* Title */}
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate">
                        {getHeaderTitle()}
                    </h2>

                    {/* User section */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <FaUserCircle className="text-gray-600" size={26} />
                        {/* Hide username on very small screens, show from sm+ */}
                        <span className="hidden sm:inline text-gray-700 text-sm sm:text-base font-medium">
        {username}
      </span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto px-2 sm:px-6 py-3 sm:py-6">
                    {renderMainContent()}
                </main>
            </div>
            {/* Modal for delete confirmation */}
            {deleteId !== null && (
                <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this booking?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded bg-red-500 text-black hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Verify results */}
            {verifyResults && (
                <div className="w-full max-w-2xl mt-4">
                    <div className="flex flex-wrap gap-2">
                        {verifyResults.map((r, idx) => (
                            <span
                                key={idx}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    r.status === "invalid" ? "text-red-700" : "text-green-700"
                                }`}
                            >
              {r.file}: {r.message}
            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}