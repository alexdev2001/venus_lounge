import BookingRow from "./BookingTableRow";
import type { Booking } from "../../../src/pages/admin/adminPage.tsx";
import { FaTrash } from "react-icons/fa";

export type BookingTableProps = {
    bookings: Booking[];
    onDelete: (id: number) => void;
};

export function BookingTable({ bookings, onDelete }: BookingTableProps) {
    return (
        <>
            {/* Mobile view: stacked cards */}
            <div className="block sm:hidden space-y-4">
                {bookings.map((b) => {
                    const startDate = new Date(b.start_time);
                    const endDate = new Date(b.end_time);
                    startDate.setHours(startDate.getHours() - 2);
                    endDate.setHours(endDate.getHours() - 2);
                    const startDateFinal = startDate.toLocaleDateString();
                    const time = `${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

                    return (
                        <div key={b.id} className="border rounded p-3 shadow">
                            <p><span className="font-semibold">Name:</span> {b.fullName ?? "N/A"}</p>
                            <p><span className="font-semibold">Start:</span> {startDateFinal}</p>
                            <p><span className="font-semibold">Time:</span> {time}</p>
                            <p><span className="font-semibold">Status:</span> {b.status}</p>
                            <button
                                onClick={() => onDelete(b.id)}
                                className="mt-2 text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Desktop view: full table */}
            <div className="hidden sm:block overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-left border-collapse text-sm">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Start Date</th>
                        <th className="px-4 py-2">End Date</th>
                        <th className="px-4 py-2">Time</th>
                        <th className="px-4 py-2">QR Code</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking) => (
                        <BookingRow key={booking.id} booking={booking} onDelete={onDelete} />
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}