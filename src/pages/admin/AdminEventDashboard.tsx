// import libraries
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import components
import { EventInfo, AttendeeInfo } from "@/components/event";
import { useDebounce } from "@/hooks";
import { fetchEventInfoAdmin, fetchEventImage, fetchEventAttendeeListAdmin } from "@/api/event-services.ts";
import { FetchStatus } from "@/enum.ts";
import { FetchResult } from "@/Types";


// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";

interface AttendeeInfo {
  eventID: string;
  eventName: string;
  eventType: string;
  eventVisibility: string;
  eventDateTime: string;
  eventDuration: string;
  eventStatus: string;
  eventDescription: string;
  eventVenue: string;
}


function AdminEventDashboard() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventInfo, setEventInfo] = useState<AttendeeInfo>({
    eventID: "",
    eventName: "",
    eventType: "",
    eventVisibility: "",
    eventDateTime: "",
    eventDuration: "",
    eventStatus: "",
    eventDescription: "",
    eventVenue: "",
  });
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

    setIsLoading(false);
    if (eventInfo.status === FetchStatus.SUCCESS) {
      setEventInfo(eventInfo.result);
      return true;
    }
    else {
      processFetchFail(eventInfo);
      setIsLoading(false);
      return false;
    }
  }
  async function loadImage(abortSignal: AbortSignal | undefined) {
    setIsLoading(true);
    const eventImage = await fetchEventImage(
      abortSignal,
      eventId);

    setIsLoading(false);
    if (eventImage.status === FetchStatus.SUCCESS) {
      if (eventImage.result) {
        imageURLRef.current = eventImage.result;
        setImageURL(eventImage.result);
      }
      return true;
    }
    else {
      processFetchFail(eventImage);
      setIsLoading(false);
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

    setIsSearchLoading(false);
    if (eventAttendeeList.status === FetchStatus.SUCCESS) {
      setAttendeeList(eventAttendeeList.result);
      return true;
    }
    else {
      processFetchFail(eventAttendeeList);
      setIsSearchLoading(false);
      return false;
    }
  }


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
              {attendeeList.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No attendees found.
                  </td>
                </tr>
              )}
              {attendeeList.map((attendee: { attendeeID: string, attendeeName: string, rsvp: string, date: string }, key: number) => (
                <AttendeeInfo
                  key={key}
                  id={attendee.attendeeID}
                  name={attendee.attendeeName}
                  status={attendee.rsvp}
                  invitationDate={attendee.date}
                  isEdit={false}
                  onDeleteHandler={(id: string, name: string) => { console.log(id + name); return; }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminEventDashboard;
