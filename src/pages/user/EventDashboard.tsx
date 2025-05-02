import { useState } from "react";
import {
  AttendeeList,
  EventInfo,
  DiscussionBoard,
} from "@/components/event";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";
import Loading from "../others/Loading";
import { verifyEventAccess, fetchJoinRequestList, fetchEventInfo, fetchEventImage, fetchEventChatLog, fetchEventAttendeeList } from "@/api/event-services.ts";
import { FetchStatus } from "@/enum.ts";
import { FetchResult } from "@/Types";
import JoinRequestList  from "@/components/event/JoinRequestList.tsx";

function EventDashboard() {
  // Get event ID from URL parameters
  const { eventId } = useParams();
  // Interface control hooks
  const [render, setRender] = useState<boolean>(false);
  // Data hooks
  const [joinRequestList, setJoinRequestList] = useState<any>([]);
  const [attendeeList, setAttendeeList] = useState<any>([]);
  const [chatLog, setChatLog] = useState<any>([]);
  const [imageURL, setImageURL] = useState<string>(eventImagePlaceholder);
  const imageURLRef = useRef<string>(eventImagePlaceholder);
  const [eventInfo, setEventInfo] = useState({
    eventName: "Loading...",
    eventID: "Loading...",
    eventDateTime: "Loading...",
    eventDuration: "Loading...",
    eventType: "Loading...",
    eventStatus: "Loading...",
    eventVisibility: "Loading...",
    eventDescription: "Loading...",
    eventVenue: "Loading...",
    isOrganizer: false,
  });
  const isOrganizerRef = useRef<boolean>(false);
  // Navigate hook
  const navigate = useNavigate();

  // Data fetching functions
  function processFetchFail (fetchResult : FetchResult) {
    if (fetchResult.status === FetchStatus.UNAUTHORIZED) {
      console.log("Session expired. Please log in again.");
      alert("Session expired. Please log in again.");
      navigate("/login");
    } else if (fetchResult.status === FetchStatus.NOT_FOUND) {
      navigate("/not-found-page");
    } else if (fetchResult.status === FetchStatus.ERROR) {
      alert("Service temporarily unavailable. Please try again later.");
      navigate("/workspace/event");
    }
  }

  async function checkAccess (abortSignal: AbortSignal | undefined) {
    const verificationResult = await verifyEventAccess(abortSignal, eventId);
      if (verificationResult.status === FetchStatus.SUCCESS) {
        return true;
      }
      else  {
        console.log(verificationResult.status);
        processFetchFail(verificationResult);
        return false;
      }
  }

  async function loadInfo (abortSignal: AbortSignal | undefined) {
    const eventInfo = await fetchEventInfo(
      abortSignal,
      eventId);

    if (eventInfo.status === FetchStatus.SUCCESS) {
      isOrganizerRef.current = eventInfo.result.isOrganizer;
      setEventInfo(eventInfo.result);
      return true;
    } 
    else {
      processFetchFail(eventInfo);
      return false;
    }
  }

  async function loadImage (abortSignal: AbortSignal | undefined) {
    const eventImage = await fetchEventImage(
      abortSignal,
      eventId);

    if (eventImage.status === FetchStatus.SUCCESS) {
      if (eventImage.result) {
        imageURLRef.current = eventImage.result;
        setImageURL(eventImage.result);
      }
      return true;
    } 
    else {
      processFetchFail(eventImage);
      return false;
    }
  }

  async function loadChatLog (abortSignal: AbortSignal | undefined) {
    const eventChatlog = await fetchEventChatLog(
      abortSignal,
      eventId);

    if (eventChatlog.status === FetchStatus.SUCCESS) {
      setChatLog(eventChatlog.result);
      return true;
    } 
    else {
      processFetchFail(eventChatlog);
      return false;
    }
  }

  async function loadAttendeeList (abortSignal: AbortSignal | undefined) {
    const eventAttendeeList = await fetchEventAttendeeList(
      abortSignal,
      eventId);

    if (eventAttendeeList.status === FetchStatus.SUCCESS) {
      setAttendeeList(eventAttendeeList.result);
      return true;
    } 
    else {
      processFetchFail(eventAttendeeList);
      return false;
    }
  }

  async function loadJoinRequestList (abortSignal: AbortSignal | undefined) {
    const joinRequestList = await fetchJoinRequestList(
      abortSignal,
      eventId);

    if (joinRequestList.status === FetchStatus.SUCCESS) {
      setJoinRequestList(joinRequestList.result);
      return true;
    } 
    else {
      processFetchFail(joinRequestList);
      return false;
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    async function onMount() {
      // Check access privileges and load event info
      if (!(await checkAccess(abortController.signal))) {
        return;
      }
      
      if (!(await loadInfo(abortController.signal))) {
        return;
      }

      // Close loading screen
      setRender(true);

      // Fetch other data (fetch asynchonously to improve loading time)
      loadImage(abortController.signal);
      loadChatLog(abortController.signal);
      if(isOrganizerRef.current) {
        loadAttendeeList(abortController.signal);
        loadJoinRequestList(abortController.signal);
      }
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

  return (
    <div>
      {!render ? (
        <Loading />
      ) : (
        <div className="p-4 sm:p-6 md:p-4 bg-gray-50">
          {/* Event info and image */}
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
            isOrganizer={eventInfo.isOrganizer}
          />
          {/* Attendee list (Only show attendee list if the user is the organizer) */}
          {eventInfo.isOrganizer && (
            <>
              <JoinRequestList
                joinRequestList={joinRequestList}
                refreshHandler={async () => {await loadJoinRequestList(undefined); await loadAttendeeList(undefined);}}
                eventID={eventId}
              />
              <AttendeeList
                attendeeList={attendeeList}
                refreshHandler={loadAttendeeList}
                eventID={eventId}
              />
            </>
          )}
          {/* Discussion board */}
          <DiscussionBoard
            chatLog={chatLog}
            eventID={eventInfo.eventID}
            refreshHandler={loadChatLog}
          />
        </div>
      )}
    </div>
  );
}

export default EventDashboard;
