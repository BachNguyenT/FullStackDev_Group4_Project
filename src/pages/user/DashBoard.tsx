import { useState, useEffect } from "react";
import { Button } from "@/components/ui/components/Button";
import { useNavigate } from "react-router-dom";
import useEvent from "@/hooks/useEvent";
import EventCard from "@/components/ui/components/EventCard";
import InvitationCard from "@/components/ui/components/InvitationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function DashBoard({ sidebarOpen }: { sidebarOpen: boolean }) {
  const [events, setEvents] = useState([]);
  const [maxAttendeeCount, setMaxAttendeeCount] = useState(0);
  const [eventNameSearch, setEventNameSearch] = useState("");
  const [eventVisibilitySearch, setEventVisibilitySearch] = useState(0);
  const [sortDirection, setSortDirection] = useState(0);
  const [eventStatusSearch, setEventStatusSearch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hostedEvents, setHostedEvents] = useState<{ label: string; value: number }[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<{ label: string; value: number }[]>([]);
  const [invitationsData, setInvitationsData] = useState<{ label: string; value: number }[]>([]);
  const navigate = useNavigate();

  // Fetch organizing events
  async function fetchEvents(abortSignal: AbortSignal | null) {
    setIsLoading(true);
    try {
      const searchParams = new URLSearchParams({
        name: eventNameSearch,
        status: eventStatusSearch.toString(),
        visibility: eventVisibilitySearch.toString(),
        order: sortDirection.toString(),
      });

      const response = await fetch(
        `http://localhost:3000/query-organizing-events?${searchParams.toString()}`,
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
        setMaxAttendeeCount(data.maxAttendeeCount);
        setEvents(data.events);
        setIsLoading(false);
        return;
      } else if (response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      } else {
        alert("Service temporarily unavailable. Please try again later.");
        setIsLoading(false);
        return;
      }
    } catch {
      alert("Service temporarily unavailable. Please try again later.");
      setIsLoading(false);
      return;
    }
  }

  // Fetch hosted events stats
  async function fetchHostedEventsStats(abortSignal: AbortSignal | null) {
    try {
      const response = await fetch(`http://localhost:3000/get-hosted-events-stats-graph`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: abortSignal,
      });

      if (response.status === 200) {
        const data = await response.json();
        setHostedEvents(data);
      } else if (response.status === 401) {
        navigate("/login");
      }
    } catch {
      console.error("Failed to fetch hosted events stats");
    }
  }

  // Fetch joined events stats
  async function fetchJoinedEventsStats(abortSignal: AbortSignal | null) {
    try {
      const response = await fetch(`http://localhost:3000/get-joined-events-stats-graph`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: abortSignal,
      });

      if (response.status === 200) {
        const data = await response.json();
        setJoinedEvents(data);
      } else if (response.status === 401) {
        navigate("/login");
      }
    } catch {
      console.error("Failed to fetch joined events stats");
    }
  }

  // Fetch invitations stats
  async function fetchInvitationsStats(abortSignal: AbortSignal | null) {
    try {
      const response = await fetch(`http://localhost:3000/get-invitations-stats-graph`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: abortSignal,
      });

      if (response.status === 200) {
        const data = await response.json();
        setInvitationsData(data);
      } else if (response.status === 401) {
        navigate("/login");
      }
    } catch {
      console.error("Failed to fetch invitations stats");
    }
  }

  // Fetch all data on component mount
  useEffect(() => {
    const abortController = new AbortController();

    fetchEvents(abortController.signal);
    fetchHostedEventsStats(abortController.signal);
    fetchJoinedEventsStats(abortController.signal);
    fetchInvitationsStats(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []);

  const { showMore: showMoreEvent, displayedItems: displayedEvents } = useEvent(
    events,
    sidebarOpen
  );

  const invitations = Array(4).fill(null);
  const { showMore: showMoreInvitation, displayedItems: displayedInvitations } =
    useEvent(invitations, sidebarOpen);

  // Calculate totals for display
  const totalHosted = hostedEvents.reduce((sum, item) => sum + item.value, 0);
  const totalJoined = joinedEvents.reduce((sum, item) => sum + item.value, 0);
  const totalInvitations = invitationsData.reduce((sum, item) => sum + item.value, 0);

  // Component to render a single graph
  const Graph = ({ title, data, total }: { title: string; data: { label: string; value: number }[]; total: number }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-sm font-semibold mb-2">{title}</h4>
        <div className="space-y-2">
          {data.length > 0 ? (
            data.map((item, index) => {
              // Calculate the percentage for each item
              const percentage = total > 0 ? (item.value / total) * 100 : 0;
              return (
                <div key={index} className="flex items-center">
                  {/* Label */}
                  <span className="w-24 text-sm">{item.label}</span>
                  {/* Bar */}
                  <div className="flex-1 h-6 bg-gray-200 rounded">
                    <div
                      className="h-full bg-purple-400 rounded"
                      style={{
                        width: `${percentage}%`,
                        transition: "width 0.3s ease-in-out",
                      }}
                    ></div>
                  </div>
                  {/* Percentage Value */}
                  <span className="ml-2 text-sm">{percentage.toFixed(1)}%</span>
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

  return (
    <div className="p-4 sm:p-6 md:p-4 overflow-x">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Total Hosted Events */}
        <Graph
          title={`TOTAL HOSTED EVENTS: ${totalHosted}`}
          data={hostedEvents}
          total={totalHosted}
        />

        {/* Total Joined Events */}
        <Graph
          title={`TOTAL JOINED EVENTS: ${totalJoined}`}
          data={joinedEvents}
          total={totalJoined}
        />

        {/* Total Invitations */}
        <Graph
          title={`TOTAL INVITATIONS: ${totalInvitations}`}
          data={invitationsData}
          total={totalInvitations}
        />
      </div>

      <div className="flex items-center justify-between mb-4 mt-4">
        <h3 className="text-lg font-semibold mb-4">Upcoming events</h3>
        {showMoreEvent && (
          <div className="flex items-center justify-center align-item-center group">
            <Button
              variant="link"
              to="/workspace/event"
              animated={false}
              className="text-purple-600 p-2"
            >
              View More
            </Button>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-purple-600 transition-transform duration-300 transform group-hover:translate-x-1"
            />
          </div>
        )}
      </div>

      {/* Event Cards Grid */}
      <div
        className={`ml-10 mr-2 grid grid-cols-1 gap-x-[0px] gap-y-[16px] transition-all duration-300 ${
          sidebarOpen
            ? "sm:grid-cols-2 xl:grid-cols-3 pl-16"
            : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pl-4"
        }`}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : displayedEvents.length > 0 ? (
          displayedEvents.map((element, index) => {
            let date = new Date(element.Date);
            return (
              <EventCard
                key={index}
                eventId={element.ID}
                eventName={element.Name}
                createdOn={date.toLocaleString("en-UK", {
                  hour12: true,
                  dateStyle: "long",
                  timeStyle: "short",
                })}
                eventType={element.Type}
                visibility={element.IsPrivate ? "Private" : "Public"}
                attendeeCount={element.AtendeeCount}
                maxAttendeeCount={maxAttendeeCount}
                className="w-full sm:w-[300px] md:w-[280px] lg:w-[260px] xl:w-[240px] rounded-xl overflow-hidden shadow-lg bg-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              />
            );
          })
        ) : (
          <div>No events found.</div>
        )}
      </div>

      <div className="flex items-center justify-between mb-4 mt-12">
        <h3 className="text-lg font-semibold mb-4">Pending invitations</h3>
        {showMoreInvitation && (
          <div className="flex items-center justify-center align-item-center group">
            <Button
              variant="link"
              to="/invitation"
              animated={false}
              className="text-purple-600 p-2"
            >
              View More
            </Button>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-purple-600 transition-transform duration-300 transform group-hover:translate-x-1"
            />
          </div>
        )}
      </div>

      {/* Invitations List */}
      <div className="flex flex-col items-center">
        {displayedInvitations.map((_, index) => (
          <InvitationCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default DashBoard;