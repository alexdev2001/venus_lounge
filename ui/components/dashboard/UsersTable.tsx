import {useEffect, useState} from "react";

interface Role {
    roleId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: number;
    username: string;
    password: string;
    email: string | null;
    createdAt: string;
    updatedAt: string;
    roles: Role[];
}

export default function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("2");
    const [confirmPassword, setConfirmPassword] = useState("");

    const openEditDialog = (user: User) => {
        setSelectedUser(user);
        setIsEditOpen(true);
    };

    const openDeleteDialog = (user: User) => {
        setSelectedUser(user);
        setIsDeleteOpen(true);
    };

    const closeDialogs = () => {
        setSelectedUser(null);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from localStorage

            const response = await fetch("https://venus-lounge-backend.onrender.com/users", {
                headers: {
                    "Authorization": `Bearer ${token}`, // Attach token to header
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to fetch users");

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedUser && selectedUser.roles && selectedUser.roles.length > 0) {
            const userRoleName = selectedUser.roles[0].name;
            if (userRoleName === "ROLE_SUPERADMIN") {
                setRole("1");
            } else if (userRoleName === "ROLE_ADMIN") {
                setRole("2");
            } else {
                setRole("2");
            }

        }
    }, [selectedUser]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`https://venus-lounge-backend.onrender.com/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                console.error("Failed to delete user");
                return;
            }

            await fetchUsers();
            closeDialogs();

        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    const handleUpdateUser = async () => {
        if (!selectedUser) {
            return;
        }

        const updatedUser = {
            ...(username && { username }),
            ...(password && { password }),
            ...(email && { email }),
            ...(role && { roleId: [parseInt(role)] }),
        };

        try {
            const res = await fetch(`https://venus-lounge-backend.onrender.com/users/${selectedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(updatedUser),
            });

            if (!res.ok) {console.log("something went wrong"); return; }
            await fetchUsers();
            setUsername("");
            setPassword("");
            setEmail("");
            setRole("ROLE_ADMIN")
            closeDialogs();
        } catch (e) {
            console.error("Error updating user:", e);
        }
    }

    if (loading) {
        return <p className="text-center text-gray-500">Loading users...</p>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-3 border-b text-gray-700 font-semibold">Username</th>
                    <th className="p-3 border-b text-gray-700 font-semibold hidden sm:table-cell">Email</th>
                    <th className="p-3 border-b text-gray-700 font-semibold text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="p-3 border-b">{user.username}</td>
                            <td className="p-3 border-b hidden sm:table-cell">{user.email}</td>
                            <td className="p-3 border-b text-right flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                                <button
                                    onClick={() => openEditDialog(user)}
                                    className="px-3 py-1 bg-blue-500 text-black rounded hover:bg-blue-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => openDeleteDialog(user)}
                                    className="px-3 py-1 bg-red-500 text-black rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={3}
                            className="p-6 text-center text-gray-500 italic"
                        >
                            No users found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {isEditOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Blurred background */}
                    <div
                        className="absolute inset-0 bg-opacity-30 backdrop-blur-sm"
                        onClick={closeDialogs}
                    />
                    <div className="relative bg-white rounded-xl p-6 w-96 z-10 shadow-lg animate-fadeIn">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                            Edit User
                        </h2>

                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateUser()
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium text-left text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => {setUsername(e.target.value);}}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-left text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value);}}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-left text-gray-700 mb-1">
                                    Role
                                </label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="2">Admin</option>
                                    <option value="1">Super Admin</option>
                                </select>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-left text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-left text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                        confirmPassword && confirmPassword !== password
                                            ? "border-red-500 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-blue-400"
                                    }`}
                                />
                                {confirmPassword && confirmPassword !== password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Passwords do not match
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-3 mt-4">
                                <button
                                    type="button"
                                    onClick={closeDialogs}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Dialog */}
            {isDeleteOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0  bg-opacity-30 backdrop-blur-sm"
                        onClick={closeDialogs}
                    />
                    <div className="relative bg-white rounded-lg p-6 w-96 z-10">
                        <h2 className="text-xl font-semibold mb-4">Delete User</h2>
                        <p>
                            Are you sure you want to delete <strong>{selectedUser.username}</strong>?
                        </p>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                onClick={closeDialogs}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(selectedUser?.id)} className="px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </div>
    )
}