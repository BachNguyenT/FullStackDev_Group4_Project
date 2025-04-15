
import { Button } from "@/components/ui/components/Button"
import { useEvent } from "@/hooks";
import { useLayout } from "@/context";
import { EventCard } from "@/components/ui";
import { InvitationCard } from "@/components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
function Home() {

  const { sidebarOpen } = useLayout();

  const events = Array(4).fill(null);
  const { showMore: showMoreEvent, displayedItems: displayedEvents } = useEvent(events, sidebarOpen);

  const invitations = Array(4).fill(null);
  const { showMore: showMoreInvitation, displayedItems: displayedInvitations } = useEvent(invitations, sidebarOpen);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="w-full h-60">Display Graph </div>

      <div className="flex items-center justify-between mb-4 mt-4">
        <h3 className="text-lg font-semibold mb-4">Upcomming events</h3>
        {showMoreEvent && (
          <div className="flex items-center justify-center align-item-center  group">
            <Button
              variant="link"
              to="/event"
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
        {displayedEvents.map((_, index: string) => (
          <EventCard key={index} />
        ))}
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
          </div>)}
      </div>

      {/* Invitations List */}
      <div >
        {displayedInvitations.map((_, index) => (
          <InvitationCard key={index} />
        ))}
      </div>

    </div>
  );
}
export default Home;