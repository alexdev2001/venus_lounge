import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

interface Booking {
    id?: number;
    fullName?: string;
    email: string;
    packageType: "silver" | "gold" | "platinum";
    numPeople: number;
    start_time: Date | string;
    end_time: Date | string;
    qr_code?: string | null;
    status?: "pending" | "verified" | "past due";
}

type ChartData = {
    name: string;
    duration: number;
    packageType: "silver" | "gold" | "platinum" | "none";
};

const COLORS = {
    silver: "#c0c0c0",
    gold: "#ffd700",
    platinum: "#e5e4e2",
    none: "#e5e7eb", // light gray for empty slots
};

export default function SlotVisualizer({ bookings, selectedDate }: { bookings: Booking[]; selectedDate: string }) {
    // 2-hour intervals from 8:00 → 20:00
    const hours: ChartData[] = Array.from({ length: 7 }, (_, i) => {
        const hour = 8 + i * 2;
        return {
            name: `${hour}:00`,
            duration: 0,
            packageType: "none",
        };
    });

    const filteredData: ChartData[] = useMemo(() => {
        if (!selectedDate) return hours;

        const selectedDay = new Date(selectedDate).toDateString();

        const dailyBookings = bookings
            .filter((b) => new Date(b.start_time).toDateString() === selectedDay)
            // Sort so later end_time comes later in the array → bottom of chart
            .sort((a, b) => new Date(a.end_time).getTime() - new Date(b.end_time).getTime());

        if (dailyBookings.length === 0) return hours;

        return dailyBookings.map((b) => ({
            name: `${new Date(b.start_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })} - ${new Date(b.end_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`,
            duration:
                (new Date(b.end_time).getTime() - new Date(b.start_time).getTime()) /
                (1000 * 60 * 60),
            packageType: b.packageType,
        }));
    }, [bookings, selectedDate]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={filteredData}
                layout="vertical"
                margin={{ left: 60, right: 20, top: 20, bottom: 20 }}
                barSize={20} // reduce bar thickness to fit dialog
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis
                    type="category"
                    dataKey="name"
                    width={50} // narrower Y-axis
                    interval={0} // show all labels
                />
                <Tooltip />
                <Bar dataKey="duration" radius={6}>
                    {filteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.packageType]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}