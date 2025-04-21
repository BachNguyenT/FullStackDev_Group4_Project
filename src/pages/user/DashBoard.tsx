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
  const navigate = useNavigate();

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

      if (response.status == 200) {
        const data = await response.json();
        setMaxAttendeeCount(data.maxAttendeeCount);
        setEvents(data.events);
        setIsLoading(false);
        return;
      } else if (response.status == 401) {
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

  useEffect(() => {
    const abortController = new AbortController();

    fetchEvents(abortController.signal);

    return () => {
      abortController.abort(); // Clean up the fetch request on component unmount
    };
  }, []);

  const { showMore: showMoreEvent, displayedItems: displayedEvents } = useEvent(
    events,
    sidebarOpen
  );

  const invitations = Array(4).fill(null);
  const { showMore: showMoreInvitation, displayedItems: displayedInvitations } =
    useEvent(invitations, sidebarOpen);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the user home page!</p>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="w-full h-60">Display Graph </div>

      <div className="flex items-center justify-between mb-4 mt-4">
        <h3 className="text-lg font-semibold mb-4">Upcomming events</h3>
        {showMoreEvent && (
          <div className="flex items-center justify-center align-item-center  group">
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
        className={`ml-10 mr-2 grid grid-cols-1 gap-x-[0px] gap-y-[16px] transition-all duration-300 ${sidebarOpen
          ? "sm:grid-cols-2 xl:grid-cols-3"
          : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
                createdOn={date.toLocaleDateString()}
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
          <div className="flex items-center justify-center align-item-center  group">
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
      <div>
        {displayedInvitations.map((_, index) => (
          <InvitationCard key={index} />
        ))}
      </div>
    </div>
  );
}
export default DashBoard;
