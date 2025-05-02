import { useEffect, useState, useRef } from "react";
import EventCard from "@/components/event/EventCard";
import Dropdown from "@/components/general/Dropdown";
import { useNavigate } from "react-router-dom";

function EventBrowser({ sidebarOpen }: { sidebarOpen: boolean }) {
  // SortDirection: 0 = Default, 1 = Most recent, 2 = Oldest
  // Status: 0 = All, 1 = Completed, 2 = Ongoing
  const sortItems = [
    { text: "Default" },
    { text: "Most Recent" },
    { text: "Oldest" },
  ];
  const statusItems = [
    { text: "All" },
    { text: "Completed" },
    { text: "Ongoing" },
  ];
  const eventTypes = [
    { text: "Conference" },
    { text: "Workshop" },
    { text: "Webinar" },
    { text: "Meetup" },
    { text: "Wedding" },
    { text: "Other" },
  ];

  interface Event {
    ID: string;
    Name: string;
    Date: string;
    Type: string;
    IsPrivate: boolean;
    AttendeeCount: number; // Fixed typo from AtendeeCount
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [maxAttendeeCount, setMaxAttendeeCount] = useState<number>(0);
  const [eventNameSearch, setEventNameSearch] = useState<string>("");
  const [eventTypeSearch, setEventTypeSearch] = useState<string>("All");
  const [eventStatusSearch, setEventStatusSearch] = useState<string>("All");
  const [sortDirection, setSortDirection] = useState<string>("Default");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Custom debounce function
  const debounce = (func: () => void, delay: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(func, delay);
  };

  async function fetchEvents(abortSignal: AbortSignal | null) {
    setIsLoading(true);
    try {
      const searchParams = new URLSearchParams({
        name: eventNameSearch,
        type: eventTypeSearch === "All" ? "" : eventTypeSearch,
        status: statusItems.findIndex((item) => item.text === eventStatusSearch).toString(),
        order: sortItems.findIndex((item) => item.text === sortDirection).toString(),
      });
      console.log("Fetching events with params:", searchParams.toString());

      const response = await fetch(
        `http://localhost:3000/browse-event?${searchParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          signal: abortSignal,
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("Response data:", data);
        if (!Array.isArray(data.events) || typeof data.maxAttendeeCount !== "number") {
          console.error("Invalid response format:", data);
          throw new Error("Invalid response format from server");
        }
        setMaxAttendeeCount(data.maxAttendeeCount);
        setEvents(data.events);
      } else if (response.status === 401) {
        console.log("Unauthorized: Redirecting to login");
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        const errorText = await response.text();
        console.error(`Fetch error: Status ${response.status}, Response: ${errorText}`);
        alert("Service temporarily unavailable. Please try again later.");
        setEvents([]);
      }
    } catch (error) {
      console.error("Fetch events failed:", error);
      alert("Service temporarily unavailable. Please try again later.");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    debounce(() => fetchEvents(abortController.signal), 300);

    return () => {
      abortController.abort();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [eventNameSearch, eventTypeSearch, eventStatusSearch, sortDirection]);

  return (
    <div className="p-4 sm:p-6 md:p-4 overflow-x">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Browse Events</h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-sm md:w-full lg:w-auto">
          <div className="h-[36px] items-center border border-gray-300 rounded-md p-1 bg-white shadow-sm focus-within:border-gray-600">
            <input
              onChange={(e) => setEventNameSearch(e.target.value)}
              type="text"
              placeholder="Search Events..."
              className="ml-2 w-full outline-none text-sm"
            />
          </div>

          <Dropdown
            value={sortDirection}
            placeholder="Order events by:"
            items={sortItems}
            valueSetter={setSortDirection}
          />
          <Dropdown
            value={eventTypeSearch}
            placeholder="Event type:"
            items={[{ text: "All" }, ...eventTypes]}
            valueSetter={setEventTypeSearch}
          />
          <Dropdown
            value={eventStatusSearch}
            placeholder="Event status:"
            items={statusItems}
            valueSetter={setEventStatusSearch}
          />

        </div>
      </div>

      <div
        className={`grid grid-cols-1 gap-x-[16px] gap-y-[24px] transition-all duration-300 ${
          sidebarOpen
            ? "sm:grid-cols-2 xl:grid-cols-3 pl-16"
            : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pl-4"
        }`}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : events.length > 0 ? (
          events.map((element, index) => {
            const date = new Date(element.Date.slice(0, -1));
            return (
              <EventCard
                key={index}
                eventId={element.ID}
                eventName={element.Name}
                dateTime={date}
                eventType={element.Type}
                visibility="Public" // Only public events are returned
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