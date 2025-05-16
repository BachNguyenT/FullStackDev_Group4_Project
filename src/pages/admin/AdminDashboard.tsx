// import libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// import components
import { StatusBarProps, UserRowProps } from "@/Types";
import { Button } from "@/components/general/Button";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUser } from "@fortawesome/free-solid-svg-icons";

function AdminDashboard() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalEvent, setTotalEvent] = useState(0);
  const navigate = useNavigate();
  const [rsvpData, setRsvpData] = useState<{ label: string; value: number }[]>(
    []
  );
  const [totalRsvp, setTotalRsvp] = useState(0);
  const [eventStatusData, setEventStatusData] = useState<
    { label: string; value: number }[]
  >([]);
  const [productiveUsers, setProductiveUsers] = useState<
    { id: string; name: string; eventCount: number; pfp: string, username: string }[]
  >([]);
  const [typicalEvents, setTypicalEvents] = useState<
    {
      ID: string;
      Name: string;
      OrganizerName: string;
      AttendeeCount: number;
      avatar: string | null;
    }[]
  >([]);

  const StatusBar = ({ label, percentage, color }: StatusBarProps) => (
    <div className="flex flex-col items-start mb-4">
      <div className="text-sm text-gray-600 font-medium mb-1">{label}</div>
      <div className="w-full bg-gray-200 rounded-full h-6">
        <div
          className={`${color} h-6 rounded-full flex items-center justify-center`}
          style={{ width: `${percentage}%` }}
        >
          <span className="text-sm text-white font-medium">
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );

  const Graph = ({
    title,
    data,
    total,
  }: {
    title: string;
    data: { label: string; value: number }[];
    total: number;
  }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-sm font-semibold mb-2">{title}</h4>
        <div className="flex justify-center items-end h-32 gap-4">
          {data.length > 0 ? (
            data.map((item, index) => {
              const heightPercentage =
                total > 0 ? (item.value / total) * 100 : 0;

              const getColor = (label: string) => {
                switch (label) {
                  case "Pending":
                    return "#D8B4FE";
                  case "Accepted":
                    return "#A78BFA";
                  case "Declined":
                    return "#C084FC";
                  default:
                    return "#D8B4FE";
                }
              };

              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-8 h-28 rounded-full overflow-hidden bg-black">
                    <div
                      className="absolute bottom-0 w-full"
                      style={{
                        height: `${heightPercentage}%`,
                        backgroundColor: getColor(item.label),
                        borderTopLeftRadius: "0.5rem",
                        borderTopRightRadius: "0.5rem",
                        transition: "height 0.3s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <span className="mt-1 text-xs font-medium text-gray-700">
                    {heightPercentage.toFixed(1)}%
                  </span>
                  <span className="text-xs text-gray-500">{item.label}</span>
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    );
  };

  async function fetchTotalEvents(signal: AbortSignal | null) {
    try {
      const response = await fetch(`http://localhost:3000/admin/TotalEvents`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        signal,
      });

      const data = await response.json();
      if (response.status === 200 && data.totalEvents !== undefined) {
        const total = parseInt(data.totalEvents, 10);
        if (!isNaN(total)) setTotalEvent(total);
      }
    } catch (error) {
      console.error("Error fetching event count:", error);
    }
  }

  async function fetchTotalUsers(signal: AbortSignal | null) {
    try {
      const response = await fetch(`http://localhost:3000/admin/TotalUsers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        signal,
      });

      const data = await response.json();
      if (response.status === 200 && data.totalUsers !== undefined) {
        const total = parseInt(data.totalUsers, 10);
        if (!isNaN(total)) setTotalUser(total);
      }
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  }

  async function fetchRsvpGraph(signal: AbortSignal | null) {
    try {
      const response = await fetch(`http://localhost:3000/admin/RSVPgraph`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        signal,
      });

      const data = await response.json();
      if (response.status === 200 && Array.isArray(data)) {
        setRsvpData(data);
        const total = data.reduce((sum, item) => sum + item.value, 0);
        setTotalRsvp(total);
      }
    } catch (error) {
      console.error("Error fetching RSVP graph:", error);
    }
  }

  async function fetchEventStatusGraph(signal: AbortSignal | null) {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/EventStatusGraph`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          signal,
        }
      );

      const data = await response.json();
      if (response.status === 200 && Array.isArray(data)) {
        setEventStatusData(data);
      }
    } catch (error) {
      console.error("Error fetching event status graph:", error);
    }
  }

  function UserRow({
    id,
    name,
    username,
    events,
    image,
    showDefaultAvatar = false,
  }: UserRowProps) {
    return (
      <tr className="border-b border-gray-200 hover:bg-gray-50" onClick={() => navigate(`/admin/user/${id}`)}>
        <td className="py-4 text-sm">
          <div className="flex items-center space-x-3">
            {image ? (
              <img src={image} alt={name} className="h-8 w-8 rounded-full" />
            ) : showDefaultAvatar ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-gray-500" />
              </div>
            ) : (
              <img
                src="/placeholder.svg?height=40&width=40"
                alt={name}
                className="h-8 w-8 rounded-full"
              />
            )}
            <span>{username}</span>
          </div>
        </td>
        <td className="py-4 text-sm">{name}</td>
        <td className="py-4 text-right text-sm">{events}</td>
      </tr>
    );
  }

  async function getProductiveUsers(signal: AbortSignal | null) {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/ProductiveUsers`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          signal,
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setProductiveUsers(data);
        }
      } else {
        console.error("Failed to fetch productive users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching productive users:", error);
    }
  }

  async function fetchTypicalEvents(signal: AbortSignal | null) {
    try {
      const response = await fetch(`http://localhost:3000/admin/TypicalEvent`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        signal,
      });

      if (response.status === 200) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setTypicalEvents(data);
        }
      } else {
        console.error("Failed to fetch typical events:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching typical events:", error);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    fetchTotalEvents(abortController.signal); // Fetch total events
    fetchTotalUsers(abortController.signal); // Fetch total users
    fetchRsvpGraph(abortController.signal); // Fetch RSVP graph data
    fetchEventStatusGraph(abortController.signal); // Fetch event status graph data
    getProductiveUsers(abortController.signal); // Fetch productive users data
    fetchTypicalEvents(abortController.signal); // Fetch typical events data
    return () => abortController.abort();
  }, []);

  const totalStatus = eventStatusData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="flex bg-gray-50">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <div className="col-span-1">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="text-xs text-gray-500">
                  Total Organizer/Attendee:
                </div>
                <div className="mt-1 text-2xl font-bold">{totalUser}</div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="text-xs text-gray-500">Total Event:</div>
                <div className="mt-1 text-2xl font-bold">{totalEvent}</div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="rounded-lg border border-gray-200 bg-white p-6 h-full flex flex-col items-center">
                <h3 className="text-sm font-medium text-gray-500 text-center mb-4">
                  RSVP Response Breakdown
                </h3>
                <Graph title="" data={rsvpData} total={totalRsvp} />
              </div>
            </div>

            <div className="col-span-1">
              <div className="rounded-lg border border-gray-200 bg-white p-6 h-full flex flex-col items-center">
                <h3 className="text-sm font-medium text-gray-500 text-center mb-4">
                  Event Status
                </h3>
                <div className="flex flex-col space-y-4 w-full px-4">
                  {eventStatusData.map((item, idx) => (
                    <StatusBar
                      key={idx}
                      label={item.label}
                      percentage={
                        totalStatus > 0 ? (item.value / totalStatus) * 100 : 0
                      }
                      color="bg-purple-300"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Productive Users Section */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-medium">Productive Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-2 text-left text-sm font-medium text-gray-500">
                      Username
                    </th>
                    <th className="pb-2 text-left text-sm font-medium text-gray-500">
                      Name
                    </th>
                    <th className="pb-2 text-right text-sm font-medium text-gray-500">
                      Total Events
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productiveUsers.map((user) => (
                    <UserRow
                      key={user.id}
                      id={user.id}
                      username={user.username}
                      name={user.name}
                      events={user.eventCount}
                      image={user.pfp}
                      showDefaultAvatar
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-end align-item-center group">
            <Button
              variant="link"
              to="/admin/user"
              animated={false}
              className="text-purple-600 p-2"
            >
              View All
            </Button>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-purple-600 transition-transform duration-300 transform group-hover:translate-x-1"
            />
          </div>

          {/* Typical Events Section */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-medium">Popular Events</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-2 text-left text-sm font-medium text-gray-500">
                      Event Name
                    </th>
                    <th className="pb-2 text-left text-sm font-medium text-gray-500">
                      Event Organizer
                    </th>
                    <th className="pb-2 text-right text-sm font-medium text-gray-500">
                      Total attendees
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {typicalEvents.map((event, id) => (
                    <tr key={id} className="border-b border-gray-200 hover:bg-gray-50" onClick={() => navigate(`/admin/event/${event.ID}`)}>
                      <td className="py-4 text-sm">
                        <div className="flex items-center space-x-3">
                          {event.avatar ? (
                            <img
                              src={event.avatar}
                              alt={event.Name}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <FontAwesomeIcon
                                icon={faUser}
                                className="h-4 w-4 text-gray-500"
                              />
                            </div>
                          )}
                          <span>{event.Name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm">{event.OrganizerName}</td>
                      <td className="py-4 text-right text-sm">
                        {event.AttendeeCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-end align-item-center group">
            <Button
              variant="link"
              to="/admin/event"
              animated={false}
              className="text-purple-600 p-2"
            >
              View All
            </Button>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-purple-600 transition-transform duration-300 transform group-hover:translate-x-1"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
export default AdminDashboard;