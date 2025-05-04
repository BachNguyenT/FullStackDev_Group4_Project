// import libraries
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import components
import { Button } from "@/components/general/Button";
import { EventInfo, AttendeeInfo } from "@/components/event";
import { ConfirmModal } from "@/components/modals";
import { useDebounce } from "@/hooks";
import { fetchEventInfoAdmin, fetchEventImage, fetchEventAttendeeListAdmin } from "@/api/event-services.ts";
import { FetchStatus } from "@/enum.ts";
import { FetchResult, EventInfoProps } from "@/Types";


// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSpinner,faTrash } from "@fortawesome/free-solid-svg-icons";
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";


function AdminEventDashboard() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState<EventInfoProps>({});
  const [attendeeList, setAttendeeList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [imageURL, setImageURL] = useState<string>(eventImagePlaceholder);
  const imageURLRef = useRef<string>(eventImagePlaceholder);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);




  // Data fetching functions
  function processFetchFail(fetchResult: FetchResult) {
    if (fetchResult.status === FetchStatus.UNAUTHORIZED) {
      alert("Session expired. Please log in again.");
      navigate("/login");
    } else if (fetchResult.status === FetchStatus.NOT_FOUND) {
      navigate("/not-found-pageAdmin");
    } else if (fetchResult.status === FetchStatus.ERROR) {
      alert("Service temporarily unavailable. Please try again later.");
      navigate("/admin/event");
    }
  }
  async function loadInfo(abortSignal: AbortSignal | undefined) {
    setIsLoading(true);
    const eventInfo = await fetchEventInfoAdmin(
      abortSignal,
      eventId);

    if (eventInfo.status === FetchStatus.SUCCESS) {
      setEventInfo(eventInfo.result);
      setIsLoading(false);
      return true;
    }
    else {
      processFetchFail(eventInfo);
      return false;
    }
  }
  async function loadImage(abortSignal: AbortSignal | undefined) {
    setIsLoading(true);
    const eventImage = await fetchEventImage(
      abortSignal,
      eventId);

    if (eventImage.status === FetchStatus.SUCCESS) {
      if (eventImage.result) {
        imageURLRef.current = eventImage.result;
        setImageURL(eventImage.result);
        setIsLoading(false);
      }
      return true;
    }
    else {
      processFetchFail(eventImage);
      return false;
    }
  }
  async function loadAttendeeList(abortSignal: AbortSignal | undefined) {
    setIsSearchLoading(true);
    const eventAttendeeList = await fetchEventAttendeeListAdmin(
      abortSignal,
      eventId,
      debouncedSearchQuery
    );

    if (eventAttendeeList.status === FetchStatus.SUCCESS) {
      setAttendeeList(eventAttendeeList.result);
      setIsSearchLoading(false);
      return true;
    }
    else {
      processFetchFail(eventAttendeeList);
      setIsSearchLoading(false);
      return false;
    }
  }



  // Handle logic for delete modal



  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const abortController = new AbortController();

    async function onMount() {
      if (!(await loadInfo(abortController.signal))) {
        return;
      }
      // Fetch other data (fetch asynchonously to improve loading time)
      loadImage(abortController.signal);
    }

    onMount();
    return () => {
      // Clean up image URL on unmount
      if (imageURLRef.current !== eventImagePlaceholder) {
        URL.revokeObjectURL(imageURLRef.current); // Clean up the image URL object
      }

      // Abort any ongoing fetch requests
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    loadAttendeeList(abortController.signal);
  }, [debouncedSearchQuery]);



  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading Event Info...
          </h2>
        </div>
      </div>
    );
  }
  return (
    <div className="p-4 sm:p-6 md:p-4 bg-gray-50">
      <EventInfo
        imageURL={imageURL}
        eventId={eventInfo.eventID}
        eventName={eventInfo.eventName}
        eventType={eventInfo.eventType}
        visibility={eventInfo.eventVisibility}
        dateTime={eventInfo.eventDateTime}
        duration={eventInfo.eventDuration}
        status={eventInfo.eventStatus}
        description={eventInfo.eventDescription}
        venue={eventInfo.eventVenue}
        isEdit={true}
      />
      <div className="space-y-4">
        {/* Header row with search*/}
        <h1 className="text-2xl font-semibold mb-4 mt-8 ">Attendees</h1>
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search attendees..."
              className="text-sm px-3 py-1.5 border border-gray-300 rounded-md w-52 pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-2.5 text-gray-500 text-base"
            />
            {isSearchLoading && (
              <FontAwesomeIcon
                icon={faSpinner}
                className="h-4 w-4 text-gray-400 animate-spin absolute right-2 top-[10px]"
              />
            )}
          </div>
        </div>
        {/* Table */}
        <div className="overflow-auto border border-gray-300 rounded-md">
          <table className="min-w-full text-sm">
            <thead className="bg-muted text-muted-foreground text-left">
              <tr>
                <th className="py-3 px-4 font-medium">User ID</th>
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Invitation date</th>
                <th className="py-3 px-4 font-medium">RSVP Status</th>
              </tr>
            </thead>
            <tbody>
              {attendeeList.map((attendee, key) => (
                <AttendeeInfo
                  key={key}
                  id={attendee.attendeeID}
                  name={attendee.attendeeName}
                  status={attendee.rsvp}
                  invitationDate={attendee.date}
                  isEdit={false}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete modal */}
      {isDeleteModalOpen && (
        <ConfirmModal
          title={"Delete Event"}
          message={
            `Are you sure you want to delete event ${deleteID}? This action cannot be undone.`
          }
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default AdminEventDashboard;
