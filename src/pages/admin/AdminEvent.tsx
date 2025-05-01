import { useState } from "react";
import {
  ChevronDown,
  Filter,
  MoreVertical,
  Search,
  User,
  Trash,
} from "lucide-react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

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

export default function AdminEvent({
  sidebarOpen,
}: {
  sidebarOpen: boolean;
}): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  // Mock data for events
  const events: Event[] = [
    {
      id: "0000001",
      name: "A&B's wedding",
      hostId: "A",
      date: "14/02/2024, 14:00",
      attendees: 100,
      status: "ongoing",
    },
    {
      id: "0000002",
      name: "Morning routine seminar",
      hostId: "Ashton Hall",
      date: "14/02/2024, 14:00",
      attendees: 200,
      status: "ongoing",
    },
    {
      id: "0000003",
      name: "Business meeting",
      hostId: "Lebron James",
      date: "14/02/2024, 14:00",
      attendees: 20,
      status: "ongoing",
    },
    {
      id: "0000003",
      name: "D&E's Wedding",
      hostId: "D",
      date: "14/02/2024, 14:00",
      attendees: 10,
      status: "completed",
    },
  ];

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
              <div className="relative inline-block">
                <button className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                  <span>Show 10</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort:</span>
              <div className="relative inline-block">
                <button className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                  <span>Most Recent</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
              </div>
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
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            event.status === "ongoing"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {event.status === "ongoing" ? "Ongoing" : "Completed"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <button
                            className="text-gray-400 hover:text-gray-500 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash />
                          </button>
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

// Navigation Item Component
function NavItem({ label, icon, active = false }: NavItemProps): ReactElement {
  const getIcon = (iconName: string): ReactElement | null => {
    switch (iconName) {
      case "dashboard":
        return (
          <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center">
            <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
          </div>
        );
      case "events":
        return (
          <div
            className={`w-5 h-5 rounded ${
              active ? "bg-purple-200" : "border border-gray-300"
            }`}
          ></div>
        );
      case "users":
        return (
          <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center">
            <User className="h-3 w-3 text-gray-400" />
          </div>
        );
      case "account":
        return (
          <div className="w-5 h-5 rounded-full border border-gray-300"></div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
        active
          ? "bg-purple-100 text-purple-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {getIcon(icon)}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
