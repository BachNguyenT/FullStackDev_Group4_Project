// import libraries
import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

// import components
import { Button } from "@/components/general/Button";
import { useDebounce } from "@/hooks";
import { Dropdown } from "@/components/general";

// import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faUser,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// Define types for our data and components
interface Event {
  id: string;
  name: string;
  hostId: string;
  date: string;
  attendees: number;
  status: "ongoing" | "completed";
}

interface NavItemProps {
  label: string;
  icon: string;
  active?: boolean;
}

function AdminEvent(): ReactElement {
  const sortItems = [
    { text: "Default" },
    { text: "Most Recent" },
    { text: "Oldest" },
  ];
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventNameSearch, setEventNameSearch] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("Default");
  const debounceName = useDebounce(eventNameSearch, 500);
  const debounceSort = useDebounce(sortDirection, 500);


  async function fetchEvents(abortSignal: AbortSignal | null) {
    setIsLoading(true);
    try {
      const searchParams = new URLSearchParams({
        name: debounceName,
        order: sortItems
          .findIndex((item) => item.text === debounceSort)
          .toString(),
      });

      const response = await fetch(
        `http://localhost:3000/get-events?${searchParams.toString()}`,
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
  }, [debounceName, debounceSort]);

  const navigate = useNavigate();

  // // Mock data for events
  // const events: Event[] = [
  //   {
  //     id: "0000001",
  //     name: "A&B's wedding",
  //     hostId: "A",
  //     date: "14/02/2024, 14:00",
  //     attendees: 100,
  //     status: "ongoing",
  //   },
  //   {
  //     id: "0000002",
  //     name: "Morning routine seminar",
  //     hostId: "Ashton Hall",
  //     date: "14/02/2024, 14:00",
  //     attendees: 200,
  //     status: "ongoing",
  //   },
  //   {
  //     id: "0000003",
  //     name: "Business meeting",
  //     hostId: "Lebron James",
  //     date: "14/02/2024, 14:00",
  //     attendees: 20,
  //     status: "ongoing",
  //   },
  //   {
  //     id: "0000003",
  //     name: "D&E's Wedding",
  //     hostId: "D",
  //     date: "14/02/2024, 14:00",
  //     attendees: 10,
  //     status: "completed",
  //   },
  // ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Events</h1>
          </div>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full py-2 pl-10 pr-3 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus-within:border-gray-600"
                  placeholder="Search events..."
                  value={eventNameSearch}
                  onChange={(e) => setEventNameSearch(e.target.value)}
                />
              </div>
              <div className="relative inline-block">
                <Button
                  variant="secondary"
                  animated={false}
                >
                  <span>Show 10</span>
                  <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <Dropdown
                value={sortDirection}
                placeholder="Order events by:"
                items={sortItems}
                valueSetter={setSortDirection}
              />
            </div>

          </div>

          {/* Events Table */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Event ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Host ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      No. Attendees
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate("/event/" + event.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.hostId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.attendees}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${event.status === "ongoing"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {event.status === "ongoing" ? "Ongoing" : "Completed"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <Button
                            className="w-8 h-8  text-white bg-red-500 "
                            animated={false}
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminEvent;