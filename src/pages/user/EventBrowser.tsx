// import libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import components
import { EventBrowserCard } from "@/components/event";
import { Dropdown } from "@/components/general";
import { useDebounce } from "@/hooks";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
    AttendeeCount: number;
    Status: string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [maxAttendeeCount, setMaxAttendeeCount] = useState<number>(0);
  const [eventNameSearch, setEventNameSearch] = useState<string>("");
  const [eventTypeSearch, setEventTypeSearch] = useState<string>("All");
  const [eventStatusSearch, setEventStatusSearch] = useState<string>("All");
  const [sortDirection, setSortDirection] = useState<string>("Default");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const debounceName = useDebounce(eventNameSearch, 500);
  const debounceType = useDebounce(eventTypeSearch, 500);
  const debounceStatus = useDebounce(eventStatusSearch, 500);
  const debounceSort = useDebounce(sortDirection, 500);

  async function fetchEvents(abortSignal: AbortSignal | null) {
    setIsLoading(true);
    try {
      const searchParams = new URLSearchParams({
        name: debounceName,
        type: debounceType === "All" ? "" : debounceType,
        status: statusItems
          .findIndex((item) => item.text === debounceStatus)
          .toString(),
        order: sortItems
          .findIndex((item) => item.text === debounceSort)
          .toString(),
      });

      const response = await fetch(
        `http://localhost:3000/event/public-events?${searchParams.toString()}`,
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
        if (
          !Array.isArray(data.events) ||
          typeof data.maxAttendeeCount !== "number"
        ) {
          console.error("Invalid response format:", data);
          throw new Error("Invalid response format from server");
        }
        setMaxAttendeeCount(data.maxAttendeeCount);
        setEvents(data.events);
      } else if (response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        const errorText = await response.text();
        console.error(
          `Fetch error: Status ${response.status}, Response: ${errorText}`
        );
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
    fetchEvents(abortController.signal);
    return () => {
      abortController.abort(); // Cleanup function to abort the fetch request
    };
  }, [debounceName, debounceType, debounceStatus, debounceSort]);

  return (
    <div className="p-4 sm:p-6 md:p-4 overflow-x">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Browse Events
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-sm md:w-full lg:w-auto">
          <div className="relative h-[36px] items-center border border-gray-300 rounded-md p-1 bg-white shadow-sm focus-within:border-gray-600">
            <input
              onChange={(e) => setEventNameSearch(e.target.value)}
              type="text"
              placeholder="Search Events..."
              className="ml-2 w-full outline-none text-sm"
            />
            {isLoading && (
              <FontAwesomeIcon
                icon={faSpinner}
                className="h-4 w-4 text-gray-400 animate-spin absolute right-2 top-[10px]"
              />
            )}
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
        className={`grid grid-cols-1 gap-x-[16px] gap-y-[24px] transition-all duration-300 ${sidebarOpen
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
              <EventBrowserCard
                key={index}
                eventId={element.ID}
                eventName={element.Name}
                dateTime={date}
                eventType={element.Type}
                eventStatus={element.Status}
                visibility="Public" // Only public events are returned
                attendeeCount={element.AttendeeCount}
                maxAttendeeCount={maxAttendeeCount}
                refreshEvents={() => fetchEvents(null)} // Pass the fetchEvents function as a callback
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
