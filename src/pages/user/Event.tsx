import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/components/Button";
import EventCard from "@/components/ui/components/EventCard";
import Dropdown from "@/components/ui/components/Dropdown";

import {
  faMagnifyingGlass,
  faChevronDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Search } from "lucide-react";

function Event({ sidebarOpen }: { sidebarOpen: boolean }) {
  const [events, setEvents] = useState(Array(20).fill(null));
  const sortItems = [{ text: "Most Recent" }, { text: "Oldest" }];
  const statusItems = [
    { text: "Status: All" },
    { text: "Completed" },
    { text: "Ongoing" },
  ];
  const visibilityItems = [
    { text: "Visibility: All" },
    { text: "Private" },
    { text: "Ongoing" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-4">
      <div className="flex items-center justify-between mb-4">
        {/* Title */}
        <h2 className="text-2xl sm:text-2xl font-semibold mb-4">My Events</h2>

        {/* Add new event */}
        <span>
          <Button to="/event/addNewEvent" className="mb-2" animated={false}>
            <FontAwesomeIcon icon={faPlus} className="ml-2" />
            Add New Event
          </Button>
        </span>
      </div>

      {/* Search, Filter & Sort Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
        {/* Left: Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <div className="h-[36px] items-center border border-gray-300 rounded-md p-1 bg-white shadow-sm focus-within:border-gray-600">
            <input
              type="text"
              placeholder="Search Events..."
              className="ml-2 w-full outline-none text-sm"
            />
          </div>

          <Dropdown items={sortItems}></Dropdown>
          <Dropdown items={statusItems}></Dropdown>
          <Dropdown items={visibilityItems}></Dropdown>
          <Button
            animated={false}
            variant="ghost"
            className="border border-gray-300 shadow-sm"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
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
        {events.map((_, index) => (
          <EventCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default Event;
