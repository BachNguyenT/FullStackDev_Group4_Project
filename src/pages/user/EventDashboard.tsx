import { useState } from "react";

import {
  AttendeeList,
  EventInfo,
  DiscussionBoard,
} from "@/components/event";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";
import Loading from "../others/Loading";
import { verifyEventAccess, fetchEventInfo, fetchEventImage, fetchEventChatLog, fetchEventAttendeeList } from "@/api/event-services.ts";
import { FetchStatus } from "@/enum.ts";
import { FetchResult } from "@/Types.ts";

function EventDashboard() {
  // Get event ID from URL parameters
  const { eventId } = useParams();
  // Interface control hooks
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [render, setRender] = useState<boolean>(false);
  // Data hooks
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
  // Navigate hook
  const navigate = useNavigate();

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
      if(eventInfo.isOrganizer) {
        loadAttendeeList(abortController.signal);
      }
    }

    onMount();

    return () => {
      abortController.abort(); // Clean up the fetch request on component unmount
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
            <AttendeeList
              attendeeList={attendeeList}
              refreshHandler={undefined}
              eventID={eventId}
            />
          )}
          {/* Discussion board */}
          <DiscussionBoard
            chatLog={chatLog}
            eventID={eventInfo.eventID}
            refreshHandler={undefined}
          />
          {/* Delete modal for event and attendee */}
          {isDeleteModalOpen && (
            <ConfirmModal
              title={"Delete Event"}
              message={
                "Once the event is deleted all info and attendees will be removed."
              }
              onCancel={() => setDeleteModalOpen(false)}
              onConfirm={() => {}}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default EventDashboard;
