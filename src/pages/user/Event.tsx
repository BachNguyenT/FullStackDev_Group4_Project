import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/components/Button";
import { EventCard } from "@/components/ui";
import { useLayout } from "@/context";

import {
  faMagnifyingGlass,
  faChevronDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function Event() {
  const { sidebarOpen } = useLayout();
  const [events, setEvents] = useState(Array(20).fill(null));

  return (
    <div className="p-4 sm:p-6 md:p-4">
      <div className="flex items-center justify-between mb-4">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Events</h2>
        {/* Add new event */}
        {sidebarOpen && (
          <span>
            <Button className="mb-4" animated={false}>
              <FontAwesomeIcon icon={faPlus} className="text-gray-500 ml-2" />
              Add New Event
            </Button>
          </span>
        )}
      </div>

      {/* Search, Filter & Sort Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
        {/* Left: Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm w-full sm:w-auto">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-gray-500 mr-2"
            />
            <input
              type="text"
              placeholder="Search Events..."
              className="w-full outline-none text-sm"
            />
          </div>

          <Button animated={false} variant="secondary">
            <span>Filter</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </div>

        {/* Right: Sort */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-sm">Sort:</span>
          <Button animated={false} variant="secondary">
            Most Recent
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div
        className={`grid gap-4 transition-all duration-300 ${
          sidebarOpen
            ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {events.map((_, index) => (
          <EventCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default Event;
