// import libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import components
import { Button } from "@/components/general/Button";
import { EventCard } from "@/components/event";
import { Dropdown } from "@/components/general";
import { useDebounce } from "@/hooks";

// import icons
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Event({ sidebarOpen }: { sidebarOpen: boolean }) {
  // Visibility: 0 = All, 1 = Private, 2 = Public
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
  const visibilityItems = [
    { text: "All" },
    { text: "Private" },
    { text: "Public" },
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
  const [eventVisibilitySearch, setEventVisibilitySearch] =
    useState<string>("All");
  const [sortDirection, setSortDirection] = useState<string>("Default");
  const [eventStatusSearch, setEventStatusSearch] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const debounceName = useDebounce(eventNameSearch, 500);
  const debounceStatus = useDebounce(eventStatusSearch, 500);
  const debounceSort = useDebounce(sortDirection, 500);
  const debounceVisibility = useDebounce(eventVisibilitySearch, 500);

  async function fetchEvents(abortSignal: AbortSignal | null) {
    setIsLoading(true);
    try {
      const searchParams = new URLSearchParams({
        name: debounceName,
        status: statusItems
          .findIndex((item) => item.text === debounceStatus)
          .toString(),
        visibility: visibilityItems
          .findIndex((item) => item.text === debounceVisibility)
          .toString(),
        order: sortItems
          .findIndex((item) => item.text === debounceSort)
          .toString(),
      });

      const response = await fetch(
        `http://localhost:3000/event/organizing-events?${searchParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          signal: abortSignal,
        }
      );

      if (response.status == 200) {
        const data = await response.json();
        setMaxAttendeeCount(data.maxAttendeeCount);
        setEvents(data.events);
        setIsLoading(false);
        return;
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      } else {
        alert("Service temporarily unavailable. Please try again later.");
        setIsLoading(false);
        setEvents([]);
        return;
      }
    } catch {
      alert("Service temporarily unavailable. Please try again later.");
      setIsLoading(false);
      setEvents([]);
      return;
    }
  }

  const abortController = new AbortController();

  async function checkMaxEventHosted(): Promise<boolean> {
    try {
      const response = await fetch(
        "http://localhost:3000/event/event-hosted-limit",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          signal: abortController.signal,
        }
      );

      if (response.status === 200) {
        return true; // Allow navigation
      } else if (response.status === 400) {
        alert("You have reached your event hosting limit.");
        return false; // Block navigation
      } else {
        alert("Failed to do this action. Please try again later.");
        return false; // Block navigation
      }
    } catch (err) {
      if (!abortController.signal.aborted) {
        alert("An error occurred while trying to create a new event.");
      }
      return false; // Block navigation
    }
  }

  // Updated Button onClick Handler
  const handleAddEventClick = async () => {
    const canProceed = await checkMaxEventHosted();
    if (canProceed) {
      navigate("/workspace/event/create");
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    fetchEvents(abortController.signal);

    return () => {
      abortController.abort(); // Clean up the fetch request on component unmount
    };
  }, [debounceName, debounceStatus, debounceSort, debounceVisibility]);

  return (
    <div className="p-4 sm:p-6 md:p-4 overflow-x">
      <div className="flex items-center justify-between mb-4">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Events</h2>

        {/* Add new event */}
        <span>
          <Button
            className="mb-2"
            animated={false}
            onClick={handleAddEventClick}
          >
            <FontAwesomeIcon icon={faPlus} className="ml-2" />
            Add New Event
          </Button>
        </span>
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
            placeholder="Event status:"
            items={statusItems}
            valueSetter={setEventStatusSearch}
            value={eventStatusSearch}
          />
          <Dropdown
            placeholder="Event visibility:"
            items={visibilityItems}
            valueSetter={setEventVisibilitySearch}
            value={eventVisibilitySearch}
          />
        </div>
      </div>

      {/* Event Cards Grid */}
      <div
        className={`grid grid-cols-1 place-items-center gap-x-[16px] gap-y-[24px] transition-all duration-300 ${sidebarOpen
          ? "sm:grid-cols-2 xl:grid-cols-3"
          : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
                dateTime={date}
                eventType={element.Type}
                visibility={element.IsPrivate ? "Private" : "Public"}
                attendeeCount={element.AtendeeCount}
                maxAttendeeCount={maxAttendeeCount}
              />
            );
          })
        ) : (
          <div className="min-h-[20vh]">No events found.</div>
        )}
      </div>
    </div>
  );
}

export default Event;
