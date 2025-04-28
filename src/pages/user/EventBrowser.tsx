import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import EventCard from "@/components/ui/components/EventCard";
import { useNavigate } from "react-router-dom";

function EventBrowser({ sidebarOpen }: { sidebarOpen: boolean }) {
    interface Event {
        ID: string;
        Name: string;
        Date: string;
        Type: string;
        IsPrivate: boolean;
        AttendeeCount: number;
    }
    const [events, setEvents] = useState<Event[]>([]);
    const [maxAttendeeCount, setMaxAttendeeCount] = useState<number>(0);
    const [eventNameSearch, setEventNameSearch] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    return (
        <div className="p-4 sm:p-6 md:p-4 overflow-x">
            <div className="flex items-center justify-between mb-4">
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Browser Event</h2>


            </div>

            {/* Search, Filter & Sort Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                {/* Left: Search & Filter */}
                <div className="relative h-[36px] items-center border border-gray-300 rounded-md p-1 bg-white shadow-sm focus-within:border-gray-600">
                    <input
                        onChange={(e) => setEventNameSearch(e.target.value)}
                        type="text"
                        placeholder="Search Events..."
                        className="ml-2 w-full outline-none text-sm"
                    />

                    <FontAwesomeIcon
                        icon={faSpinner}
                        className="absolute left-38 top-2.5 text-gray-500 text-base spin"
                    />
                </div>
            </div>

            {/* Event Cards Grid */}
            <div
                className={`grid grid-cols-1 gap-x-[16px] gap-y-[24px] transition-all duration-300 ${sidebarOpen
                    ? "sm:grid-cols-2 xl:grid-cols-3 pl-16"
                    : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pl-4"
                    }`}
            >
                {isLoading ? (
                    <div>Loading...</div>
                ) : events.length > 0 ? (
                    events.map((element, index) => {
                        const date = new Date(element.Date);
                        console.log(element.Date);
                        return (
                            <EventCard
                                key={index}
                                eventId={element.ID}
                                eventName={element.Name}
                                createdOn={date.toISOString().split("T")[0]}
                                eventType={element.Type}
                                visibility={element.IsPrivate ? "Private" : "Public"}
                                attendeeCount={element.AttendeeCount}
                                maxAttendeeCount={maxAttendeeCount}
                            />
                        );
                    })
                ) : (
                    <div>No events found.</div>
                )}
            </div>
        </div>
    );
}
export default EventBrowser;