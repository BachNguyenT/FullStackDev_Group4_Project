import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/general/Button";
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
    AtendeeCount: number;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [maxAttendeeCount, setMaxAttendeeCount] = useState<number>(0);
  const [eventNameSearch, setEventNameSearch] = useState<string>("");
  const [eventTypeSearch, setEventTypeSearch] = useState<string>("");
  const [eventStatusSearch, setEventStatusSearch] = useState<number>(0);
  const [sortDirection, setSortDirection] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function fetchEvents(abortSignal: AbortSignal | null) {
    setIsLoading(true);
    try {
      const searchParams = new URLSearchParams({
        name: eventNameSearch,
        type: eventTypeSearch,
        status: eventStatusSearch.toString(),
        order: sortDirection.toString(),
      });

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
        setMaxAttendeeCount(data.maxAttendeeCount);
        setEvents(data.events);
        setIsLoading(false);
        console.log(data.events);
        return;
      } else if (response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      } else {
        alert("Service temporarily unavailable. Please try again later.");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Service temporarily unavailable. Please try again later.");
      setIsLoading(false);
      return;
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchEvents(abortController.signal);

    return () => {
      abortController.abort(); // Clean up the fetch request on component unmount
    };
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-4 overflow-x">
      <div className="flex items-center justify-between mb-4">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Browse Events</h2>
      </div>

      {/* Search, Filter & Sort Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
        {/* Left: Search & Filter */}
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
            valueSetter={(value) => setEventTypeSearch(value === "All" ? "" : value)}
          />
          <Dropdown
            value={eventStatusSearch}
            placeholder="Event status:"
            items={statusItems}
            valueSetter={setEventStatusSearch}
          />
          <Button
            animated={false}
            variant="ghost"
            className="border border-gray-300 shadow-sm"
            onClick={() => fetchEvents(null)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </div>
      </div>

      {/* Event Cards Grid */}
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
            const date = new Date(element.Date);
            return (
              <EventCard
                key={index}
                eventId={element.ID}
                eventName={element.Name}
                createdOn={date.toISOString().split("T")[0]}
                eventType={element.Type}
                visibility={element.IsPrivate ? "Private" : "Public"}
                attendeeCount={element.AtendeeCount}
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