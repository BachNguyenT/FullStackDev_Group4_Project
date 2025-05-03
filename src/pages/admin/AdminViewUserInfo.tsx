// import libraries and components
import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { Link, useParams } from "react-router-dom";

// import components
import { Button } from "@/components/general/Button";

// import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPen,         // for Edit
  faEye,
  faUserSlash, // for LogOut
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// Define types for our data and components
interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  dateJoined: string;
  birthday: string;
  phoneNumber: string;
  status: "active" | "banned" | "pending";
  avatar?: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  status: "ongoing" | "completed";
  attendees: number;
}

interface NavItemProps {
  label: string;
  icon: string;
  active?: boolean;
}

export default function AdminViewUserInfo(): ReactElement {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("Most Recent");
  const { userId } = useParams();

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUserData = async (): Promise<void> => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock user data
        const mockUser: UserProfile = {
          id: "0000001",
          name: "LeBron James",
          username: "lebron.james1",
          email: "test_10983@gmail.com",
          dateJoined: "08/05/2023",
          birthday: "12/20/1984",
          phoneNumber: "09801293732",
          status: "active",
          avatar: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSaQi2Zc9IYvTUy4j1rKPSdqm1u3DMNuW9Pq83Eim60Ahu8xs5auyY-Fne8SRP_0A7CMPL5W_jOIkMruY4",
        };

        // Mock events data
        const mockEvents: Event[] = [
          {
            id: "000001",
            name: "A&B's wedding",
            date: "10/12/2024, 14:00",
            status: "ongoing",
            attendees: 100,
          },
          {
            id: "000002",
            name: "Morning routine seminar",
            date: "10/10/2024, 09:00",
            status: "ongoing",
            attendees: 200,
          },
          {
            id: "000003",
            name: "Business meeting",
            date: "10/12/2024, 13:00",
            status: "ongoing",
            attendees: 20,
          },
          {
            id: "000033",
            name: "D&E's Wedding",
            date: "10/12/2024, 14:00",
            status: "completed",
            attendees: 50,
          },
        ];

        setUser(mockUser);
        setEvents(mockEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading user profile...
          </h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-semibold">User not found</h2>
            <p>
              The user you are looking for does not exist or has been removed.
            </p>
          </div>
          <Link to="/users" className="text-purple-600 hover:underline">
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Profile</h1>
            <Button variant="destructive" className="hover:bg-red-500 hover:text-white">
              <FontAwesomeIcon icon={faUserSlash} className="h-4 w-4" />
              Ban User
            </Button>
          </div>
          {/* User Profile Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-start">
              {/* User Avatar */}
              <div className="mr-6">
                {user.avatar ? (
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={`${user.name} avatar`}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="h-10 w-10 text-gray-400"
                    />
                  </div>
                )}
                <div className="mt-2 text-center text-sm text-gray-500">
                  ID: {user.id}
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                <div>
                  <div className="text-sm text-gray-500">Username:</div>
                  <div className="font-medium">{user.username}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email:</div>
                  <div className="font-medium">{user.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone number:</div>
                  <div className="font-medium">{user.phoneNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date joined:</div>
                  <div className="font-medium">{user.dateJoined}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Birthday:</div>
                  <div className="font-medium">{user.birthday}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status:</div>
                  <div className="font-medium">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : user.status === "banned"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 mt-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium">Hosted events</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort:</span>
                <div className="relative inline-block">
                  <Button
                    variant="secondary"
                    animated={false}
                  >
                    <span>{sortOption}</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="ml-2 h-4 w-4"
                    />
                  </Button>
                </div>
              </div>
            </div>
            {/* Hosted Events Section */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">

            </div>

            {/* Events Table */}
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
                      Date
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
                      No. Attendees
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {event.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.date}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${event.status === "ongoing"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {event.status === "ongoing" ? "Ongoing" : "Completed"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.attendees}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="secondary"
                            className="hover:bg-purple-500 hover:text-white"
                            aria-label="View event details"
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="h-6 w-6"
                            />
                          </Button>
                          <Button
                            variant="secondary"
                            className="hover:bg-blue-500 hover:text-white"
                            aria-label="Edit event"
                          >
                            <FontAwesomeIcon
                              icon={faPen}
                              className="h-6 w-6"
                            />
                          </Button>
                          <Button
                            variant="destructive"
                            className="hover:bg-red-500 hover:text-white"
                            aria-label="Delete event"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="h-6 w-6"
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
        return <div className="w-5 h-5 rounded border border-gray-300"></div>;
      case "users":
        return (
          <div
            className={`w-5 h-5 rounded ${active ? "bg-purple-200" : "border border-gray-300"
              } flex items-center justify-center`}
          >
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
      className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${active
        ? "bg-purple-100 text-purple-600"
        : "text-gray-700 hover:bg-gray-100"
        }`}
    >
      {getIcon(icon)}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
