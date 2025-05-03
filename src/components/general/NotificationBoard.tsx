import { useEffect, useState } from "react";
import { NotificationProps } from "@/Types";

function NotificationBoard() {
    const [notifications, setNotifications] = useState<NotificationProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchNotifications() {
            try {
                const response = await fetch("http://localhost:3000/notifications", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Ensures cookies are sent with the request
                    signal: abortController.signal,
                });

                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data || []); // Assuming the backend sends an array of notifications
                } else if (response.status === 401) {
                    setError("Unauthorized: Please log in to view notifications.");
                } else {
                    setError("Failed to fetch notifications. Please try again later.");
                }
            } catch (err) {
                if (!abortController.signal.aborted) {
                    setError("An error occurred while fetching notifications.");
                }
            }
        }

        fetchNotifications();

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <div className="w-[400px] h-[300px] overflow-y-auto bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-bold text-purple-600">Notification Board</h2>
            {error && <p className="text-red-500">{error}</p>}
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <Notification key={notification.ID} {...notification} />
                ))
            ) : (
                !error && <p className="text-gray-500">No notifications available.</p>
            )}
        </div>
    );
}

function Notification({ Title, Message, Date: NotificationDate }: NotificationProps) {
    return (
        <div className="border-b border-gray-200 py-2">
            <h3 className="text-lg font-medium">{Title}</h3>
            <p className="text-sm text-gray-600">
            </p>
            <p className="text-sm text-gray-600">{Message}</p>
            <p className="text-sm text-gray-600">
            </p>
            <p className="text-xs text-gray-400 mt-2">{new Date(NotificationDate).toLocaleDateString()}</p>
        </div>
    );
}

export default NotificationBoard;