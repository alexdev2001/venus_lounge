import { FaTrash} from "react-icons/fa";
import type {Booking} from "../../../src/pages/admin/adminPage.tsx";

type BookingRowProps = {
    booking: Booking;
    onDelete: (id: number) => void;
};

export default function BookingRow({ booking, onDelete }: BookingRowProps) {
    const startDate = new Date(booking.start_time);
    const endDate = new Date(booking.end_time);

    startDate.setHours(startDate.getHours() - 2);
    endDate.setHours(endDate.getHours() - 2);

    const startDateFinal = startDate.toLocaleDateString();
    const endDateFinal = endDate.toLocaleDateString();
    const time = `${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

    return (
        <tr className="hover:bg-gray-100 transition">
            <td className="px-4 py-2">{booking.fullName ?? "N/A"}</td>
            <td className="px-4 py-2">{booking.email}</td>
            <td className="px-4 py-2">{startDateFinal}</td>
            <td className="px-4 py-2">{endDateFinal}</td>
            <td className="px-4 py-2">{time}</td>
            <td className="px-4 py-2">
                <img src={booking.qr_code} alt="QR Code" className="w-12 h-12 object-contain" />
            </td>
            <td className="px-4 py-2">{booking.status}</td>
            <td className="px-4 py-2 flex gap-2">
                <button
                    onClick={() => onDelete(booking.id)}
                    className="text-red-500 hover:text-red-700 transition"
                >
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}