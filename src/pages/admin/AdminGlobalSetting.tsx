import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/general/Button";

function AdminGlobalSetting() {
    const [maxEventHosted, setMaxEventHosted] = useState(0);
    const [maxAttendees, setMaxAttendees] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const updateInfo = () => {
        updateMaxEventHosted();
        updateMaxAttendee();
    }

    async function fetchMaxEventHosted(signal: AbortSignal | null) {
        try {
            const response = await fetch(
                `http://localhost:3000/get-max-event-hosted`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    signal,
                }
            );

            const data = await response.json();
            if (response.status === 200 && data.totalEvents !== undefined) {
                const total = parseInt(data.totalEvents, 10);
                if (!isNaN(total)) {
                    setMaxEventHosted(total);
                } else {
                    console.error("Invalid totalEvents value:", data.totalEvents);
                    setMaxEventHosted(0);
                }
            } else if (response.status === 401) {
                alert("Session expired. Please log in again.");
                navigate("/login");
            } else {
                console.error(
                    "Failed to fetch max event hosted:",
                    response.status,
                    data
                );
                alert("Failed to fetch max event hosted. Please try again later.");
                setMaxEventHosted(0);
            }
        } catch (error) {
            console.error("Error fetching event count:", error);
            alert("Service temporarily unavailable. Please try again later.");
            setMaxEventHosted(0);
        }
    }
    async function fetchMaxAttendee(signal: AbortSignal | null) {
        try {
            const response = await fetch(
                `http://localhost:3000/get-max-attendee`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    signal,
                }
            );

            const data = await response.json();
            if (response.status === 200 && data.totalAttendee !== undefined) {
                const total = parseInt(data.totalAttendee, 10);
                if (!isNaN(total)) {
                    setMaxAttendees(total);
                } else {
                    console.error("Invalid totalAttendee value:", data.totalAttendee);
                    setMaxAttendees(0);
                }
            } else if (response.status === 401) {
                alert("Session expired. Please log in again.");
                navigate("/login");
            } else {
                console.error(
                    "Failed to fetch max attendee:",
                    response.status,
                    data
                );
                alert("Failed to fetch max attendee. Please try again later.");
                setMaxAttendees(0);
            }
        } catch (error) {
            console.error("Error fetching event count:", error);
            alert("Service temporarily unavailable. Please try again later.");
            setMaxAttendees(0);
        }
    }
    async function updateMaxEventHosted() {
        if (maxEventHosted < 0) {
            alert("Max event hosted cannot be negative.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/update-max-event-hosted`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ maxEventHosted }),
                }
            );

            const data = await response.json();
            if (response.status === 200 && data.debugCode === "0x000") {
                setIsEditing(false);
                fetchMaxEventHosted(null);
            } else if (response.status === 401) {
                alert("Session expired. Please log in again.");
                navigate("/login");
            } else {
                alert("Failed to update max event hosted. Please try again.");
            }
        } catch (error) {
            console.error("Error updating max event hosted:", error);
            alert("An error occurred while updating. Please try again.");
        }
    }
    async function updateMaxAttendee() {
        if (maxAttendees < 0) {
            alert("Max attendees cannot be negative.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/update-max-attendee`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ maxAttendees }),
                }
            );

            const data = await response.json();
            if (response.status === 200 && data.debugCode === "0x000") {
                setIsEditing(false);
                fetchMaxAttendee(null);
            } else if (response.status === 401) {
                alert("Session expired. Please log in again.");
                navigate("/login");
            } else {
                alert("Failed to update max event hosted. Please try again.");
            }
        } catch (error) {
            console.error("Error updating max event hosted:", error);
            alert("An error occurred while updating. Please try again.");
        }
    }
    useEffect(() => {
        const abortController = new AbortController();
        fetchMaxEventHosted(abortController.signal);
        fetchMaxAttendee(abortController.signal);
        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Global Settings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Events Hosted by User
                    </label>
                    <input
                        type="number"
                        min="0"
                        className="w-full py-2 px-4 text-sm border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:bg-gray-200"
                        value={maxEventHosted}
                        disabled={!isEditing}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setMaxEventHosted(isNaN(value) ? 0 : value);
                        }}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Attendees per Event
                    </label>
                    <input
                        type="number"
                        min="0"
                        className="w-full py-2 px-4 text-sm border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:bg-gray-200"
                        value={maxAttendees}
                        disabled={!isEditing}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setMaxAttendees(isNaN(value) ? 0 : value);
                        }}
                    />
                </div>
            </div>
            <div className="flex space-x-4">
                {isEditing ? (
                    <>
                        <Button
                            className="text-white bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                            animated={false}
                            onClick={updateInfo}
                        >
                            Update
                        </Button>
                        <Button
                            className="text-white bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                            animated={false}
                            onClick={() => {
                                setIsEditing(false);
                                fetchMaxEventHosted(null);
                                fetchMaxAttendee(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button
                        className="text-white bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        animated={false}
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
                )}
            </div>
        </div>
    );
}
export default AdminGlobalSetting;