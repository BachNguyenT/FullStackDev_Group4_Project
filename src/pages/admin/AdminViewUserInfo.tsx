// import libraries and components
import { useState, useEffect, useRef } from "react";
import type { ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";

// import components
import { Button } from "@/components/general/Button";
import { Dropdown } from "@/components/general";
import { ConfirmModal } from "@/components/modals";
import { useDebounce } from "@/hooks";

// import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faUserSlash,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";



// Define types for our data and components
interface UserProfile {
  ID: string;
  Name: string;
  Username: string;
  Email: string;
  dateJoined: string;
  Birthday: string;
  PhoneNumber: string;
  status: "active" | "banned" | "pending";
  Pfp?: { type: "Buffer"; data: number[] }; // Updated type for Pfp
}

interface Event {
  ID: string;
  Name: string;
  Date: string;
  Status: "Ongoing" | "Completed";
  NumOfAttendees: string;
}

const sortItems = [
  { text: "Default" },
  { text: "Most Recent" },
  { text: "Oldest" },
];

function AdminViewUserInfo(): ReactElement {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortDirection, setSortDirection] = useState<string>("Default");
  const imageURLRef = useRef<string | undefined>(undefined); // Using a ref to store the image URL
  const debounceSort = useDebounce(sortDirection, 500);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteEventID, setDeleteEventID] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(false);


  async function handleConfirmDeleteUser() {
    try {
      const queryParams = new URLSearchParams({
        id: userId || "",
      });
      const response = await fetch(
        `http://localhost:3000/admin-delete-user?${queryParams.toString()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        }
      );

      if (response.status == 200) {
        setDeleteModalOpen(false);
        navigate("/admin/user");
      }
      else if (response.status == 401) {
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

  async function handleConfirmDeleteOrganizeEvent() {
    try {
      const queryParams = new URLSearchParams({
        id: deleteEventID || "",
      });

      const response = await fetch(
        `http://localhost:3000/admin-delete-event?${queryParams.toString()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        }
      );

      if (response.status == 200) {
        setDeleteModalOpen(false);
        setReloadFlag(prev => !prev);
      }
      else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (response.status == 404) {
        navigate("/not-found-pageAdmin");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    }
    catch {
      alert("Service temporarily unavailable. Please try again later.");
    }
  }

  // Function to convert Buffer data to a usable image URL
  const convertBufferToImageURL = (buffer: { type: "Buffer"; data: number[] }): string => {
    try {
      const byteArray = new Uint8Array(buffer.data);
      const blob = new Blob([byteArray], { type: "image/jpeg" }); // Assuming JPEG, adjust if needed
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Failed to convert buffer to image URL:", error);
      return "/placeholder.svg"; // Fallback image
    }
  };

  const fetchUserData = async (): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const queryParams = new URLSearchParams({
        userId: userId || "",
      });
      const response = await fetch(
        `http://localhost:3000/admin-get-user-info?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setUser(data);

        // Convert Pfp buffer to image URL if Pfp exists
        if (data.Pfp && data.Pfp.data && data.Pfp.data.length > 0) {
          const imageURL = convertBufferToImageURL(data.Pfp);
          setAvatar(imageURL);
          imageURLRef.current = imageURL;
        }

        setLoading(false);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
        setUser(null);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
      setLoading(false);
    }
  };

  async function fetchOrganizedEvents(abortSignal: AbortSignal | null) {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams({
        userId: userId || "",
        order: sortItems
          .findIndex((item) => item.text === debounceSort)
          .toString(),
      });
      const response = await fetch(
        `http://localhost:3000/admin-get-organizer-events?${searchParams.toString()}`,
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
        setEvents(data);
        setLoading(false);
        return;
      } else {
        alert("Service temporarily unavailable. Please try again later.");
        setLoading(false);
        setEvents([]);
        return;
      }
    } catch {
      alert("Service temporarily unavailable. Please try again later.");
      setLoading(false);
      setEvents([]);
      return;
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchUserData();
    fetchOrganizedEvents(abortController.signal);
    // Cleanup URL object to prevent memory leaks
    return () => {
      if (abortController) {
        abortController.abort();
      }
      if (imageURLRef.current) {
        URL.revokeObjectURL(imageURLRef.current);
      }
    };
  }, [userId, debounceSort, reloadFlag]);

  if (loading || !user) {
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Profile</h1>
            <Button variant="destructive" className="hover:bg-red-500 hover:text-white"
              onClick={() => {
                setDeleteTarget("User");
                setDeleteModalOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faUserSlash} className="h-4 w-4" />
              Ban User
            </Button>
          </div>
          {/* User Profile Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-start items-center">
              {/* User Avatar */}
              <div className="flex items-center mr-8">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={`${user.Name} avatar`}
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
                <div className="ml-2">
                  <div className="text-lg font-medium text-gray-900">
                    {user.Name}
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {user.ID}
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
                <div>
                  <div className="text-sm text-gray-500">Username:</div>
                  <div className="text-lg font-medium text-gray-900">{user.Username}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email:</div>
                  <div className="text-lg font-medium text-gray-900">{user.Email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone number:</div>
                  <div className="text-lg font-medium text-gray-900">{user.PhoneNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Birthday:</div>
                  <div className="text-lg font-medium text-gray-900">{user.Birthday}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 mt-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium">Hosted events</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort:</span>
                <Dropdown
                  value={sortDirection}
                  placeholder="Order events by:"
                  items={sortItems}
                  valueSetter={setSortDirection}
                />
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
                  {!events.length && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No events found.
                      </td>
                    </tr>
                  )}
                  {events.map((event) => (
                    <tr key={event.ID}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.ID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {event.Name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(event.Date).toLocaleString("en-UK", {
                          hour12: true,
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${event.Status === "Ongoing"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {event.Status === "Ongoing" ? "Ongoing" : "Completed"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.NumOfAttendees}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="secondary"
                            className="hover:bg-purple-500 hover:text-white"
                            to={`/admin/event/${event.ID}`}
                            aria-label="View event details"
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="h-6 w-6"
                            />
                          </Button>
                          <Button
                            variant="destructive"
                            className="hover:bg-red-500 hover:text-white"
                            aria-label="Delete event"
                            onClick={() => {
                              setDeleteTarget("Event");
                              setDeleteEventID(event.ID);
                              setDeleteModalOpen(true);
                            }}
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
      {isDeleteModalOpen && (
        <ConfirmModal
          title={deleteTarget === "User" ? "Delete User" : "Delete Event"}
          message={
            deleteTarget === "User"
              ? "Are you sure you want to delete this user? This action cannot be undone."
              : "Are you sure you want to delete this event? This action cannot be undone."
          }
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={deleteTarget === "User" ? handleConfirmDeleteUser : handleConfirmDeleteOrganizeEvent}
        />
      )}
    </div>
  );
}

export default AdminViewUserInfo;