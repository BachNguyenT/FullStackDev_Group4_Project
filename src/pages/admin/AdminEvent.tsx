// import libraries
import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

// import components
import { Button } from "@/components/general/Button";
import { useDebounce } from "@/hooks";
import { Dropdown } from "@/components/general";
import { ConfirmModal } from "@/components/modals";

// import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

// Define types for our data and components
interface Event {
  ID: string;
  Name: string;
  Date: string;
  AttendeeCount: number;
  Status: string;
  OrganizerName: string;
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
  const [maxAttendeeCount, setMaxAttendeeCount] = useState<number>(0);
  const [sortDirection, setSortDirection] = useState<string>("Default");
  const debounceName = useDebounce(eventNameSearch, 500);
  const debounceSort = useDebounce(sortDirection, 500);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteID, setDeleteID] = useState<string>("");
  const [reloadFlag, setReloadFlag] = useState(false);
  const navigate = useNavigate();
  function handleDeleteClick(id: string) {
    setDeleteID(id);
    setDeleteModalOpen(true);
  }

  async function handleConfirmDelete() {
    try {
      const queryParams = new URLSearchParams({
        id: deleteID || "",
      });

      const response = await fetch(
        `http://localhost:3000/admin/DeleteEvent?${queryParams.toString()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status == 200) {
        setDeleteModalOpen(false);
        setReloadFlag((prev) => !prev);
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (response.status == 404) {
        navigate("/not-found-pageAdmin");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    } catch {
      alert("Service temporarily unavailable. Please try again later.");
    }
  }

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
        `http://localhost:3000/admin/GetEvents?${searchParams.toString()}`,
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

  // Fetch events
  useEffect(() => {
    const abortController = new AbortController();
    fetchEvents(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [debounceName, debounceSort, reloadFlag]);

  return (
    <div className="flex bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Events</h1>
          </div>

          {/* Filters and Search */}
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="h-4 w-4 text-gray-400"
                />
              </div>
              <input
                type="text"
                className="block w-full py-2 pl-10 pr-3 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus-within:border-gray-600"
                placeholder="Search events..."
                value={eventNameSearch}
                onChange={(e) => setEventNameSearch(e.target.value)}
              />
              {isLoading && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="absolute right-3 top-2.5 text-gray-500 animate-spin"
                />
              )}
            </div>
            <Dropdown
              value={sortDirection}
              placeholder="Order events by:"
              items={sortItems}
              valueSetter={setSortDirection}
            />
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
                      Host Name
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
                  {events.map((event) => (
                    <tr
                      key={event.ID}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        navigate(`/admin/event/${event.ID}`);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.ID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.Name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.OrganizerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(event.Date).toLocaleString("en-UK", {
                          hour12: true,
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.AttendeeCount} / {maxAttendeeCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            event.Status === "Ongoing"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {event.Status === "Ongoing" ? "Ongoing" : "Completed"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <Button
                            className="w-8 h-8 text-white bg-red-500"
                            animated={false}
                            size="icon"
                            onClick={(e) => {
                              handleDeleteClick(event.ID);
                              e.stopPropagation();
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="h-4 w-4"
                            />
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
      {/* Delete modal */}
      {isDeleteModalOpen && (
        <ConfirmModal
          title={"Delete Event"}
          message={`Are you sure you want to delete event ${deleteID}? This action cannot be undone.`}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
export default AdminEvent;
