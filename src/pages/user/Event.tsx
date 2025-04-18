import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/components/Button";
import EventCard from "@/components/ui/components/EventCard";

import {
  faMagnifyingGlass,
  faChevronDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import eventDummyImage from "@/assets/Pictures/event-image-placeholder.jpg";

function Event({ sidebarOpen } : { sidebarOpen : boolean }) {
  // Visibility: 0 = Private, 1 = Public, 2 = All
  // SortDirection: 0 = Ascending, 1 = Descending, 2 = Default
  const [events, setEvents] = useState([]);
  const [maxAttendeeCount, setMaxAttendeeCount] = useState(0);
  const [eventNameSearch, setEventNameSearch] = useState("");
  const [eventVisibilitySearch, setEventVisibilitySearch] = useState(2);
  const [sortDirection, setSortDirection] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  

  async function fetchEvents(abortSignal : AbortSignal | null) {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/get-organizing-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          key: "5MLGUGJL4GMe86pG4CfrE241BxDYxkeI",
        },
        body: JSON.stringify({
          eventName: eventNameSearch,
          visibilitySearch: eventVisibilitySearch,
          sortDirection: sortDirection
        }),
        credentials: "include",
        signal: abortSignal
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
        setMaxAttendeeCount(data.maxAttendeeCount);
        setIsLoading(false);
      }
      else {
        console.log("Error fetching events:", response.status);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setIsLoading(false);
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
    
    <div className="p-4 sm:p-6 md:p-4">
      <div className="flex items-center justify-between mb-4">
        {/* Title */}
        <h2 className="text-2xl sm:text-2xl font-semibold mb-4">My Events</h2>

        {/* Add new event */}
        <span>
          <Button to="/workspace/create-event" className="mb-2" animated={false}>
            <FontAwesomeIcon icon={faPlus} className="ml-2" />
            Add New Event
          </Button>
        </span>
      </div>

      {/* Search, Filter & Sort Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
        {/* Left: Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center border border-gray-300 rounded-lg px-1 py-1 bg-white shadow-sm focus-within:border-gray-600">
            <Button variant="icon" size="icon" disabled={isLoading} onClick={() => fetchEvents(null)}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-500"
              />
            </Button>

            <input
              onChange={(e) => setEventNameSearch(e.target.value)}
              type="text"
              placeholder="Search Events..."
              className="ml-2 w-full outline-none text-sm"
            />
          </div>

          <Button
            animated={false}
            variant="ghost"
            className="border border-gray-300 shadow-sm"
          >
            <span>Filter</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </div>

        {/* Right: Sort */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-sm">Sort:</span>
          <Button
            animated={false}
            variant="ghost"
            className="border border-gray-300 shadow-sm"
          >
            Most Recent
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div
        className={`ml-10 mr-2 grid gap-x-[0px] gap-y-[24px] transition-all duration-300 ${
          sidebarOpen
            ? "sm:grid-cols-1 lg:grid-cols-3"
            : "sm:grid-cols-1 lg:grid-cols-4"
        }`}
      >
        {isLoading ? <div>Loading...</div> : 
        events.map((element, index) => {
          let date = new Date(element.Date);
          return <EventCard key={index} eventId={element.ID} eventName={element.Name} createdOn={date.toLocaleDateString()} visibility={element.IsPrivate ? "Private" : "Public"} attendeeCount={element.AtendeeCount} maxAttendeeCount={maxAttendeeCount} />
        })}
      </div>
    </div>
  );
}

export default Event;
