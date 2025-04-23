import { useState } from "react";

import {
  AttendeeList,
  EventInfo,
  DiscussionBoard,
} from "@/components/ui/components/event";
import { ConfirmModal } from "@/components/ui/components/modals";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";

function EventDashboardHost() {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [attendeeList, setAttendeeList] = useState([]);
  const { eventId } = useParams();
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
  const [chatLog, setChatLog] = useState([]);
  const navigate = useNavigate();

  async function fetchEventImage(abortSignal: AbortSignal | null) {
    try {
      const queryParams = new URLSearchParams({
        id: eventId || "",
      });

      const response = await fetch(
        `http://localhost:3000/get-event-image?${queryParams.toString()}`,
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
        const blob = await response.blob();
        if (blob.size > 0) {
          const objectURL = URL.createObjectURL(blob);
          imageURLRef.current = objectURL;
          setImageURL(objectURL);
        }
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (response.status == 404) {
        navigate("/not-found-page");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
        navigate("/workspace/event");
      }
    } catch (error) {
      if (error.name == "AbortError") {
        alert("Service temporarily unavailable. Please try again later.");
      } else {
        console.log(error);
      }
    }
  }

  async function fetchEventInfo(abortSignal: AbortSignal | null) {
    try {
      const queryParams = new URLSearchParams({
        id: eventId || "",
      });

      const response = await fetch(
        `http://localhost:3000/get-event-info?${queryParams.toString()}`,
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
        return {
          eventName: data.eventName,
          eventID: data.eventID,
          eventDateTime: new Date(data.eventDateTime).toLocaleString("en-UK", {
            hour12: true,
            dateStyle: "long",
            timeStyle: "short",
          }),
          eventDuration: data.eventDuration,
          eventType: data.eventType,
          eventStatus: data.eventStatus,
          eventVisibility: data.eventVisibility,
          eventDescription: data.eventDescription,
          eventVenue: data.eventVenue,
          isOrganizer: data.isOrganizer,
        };
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (response.status == 404) {
        navigate("/not-found-page");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
        navigate("/workspace/event");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        alert("Service temporarily unavailable. Please try again later.");
      } else {
        console.log(error);
      }
    }
  }

  async function fetchEventAttendeeList(abortSignal: AbortSignal | null) {
    try {
      const queryParams = new URLSearchParams({
        id: eventId || "",
      });

      const response = await fetch(
        `http://localhost:3000/get-attendees?${queryParams.toString()}`,
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
        setAttendeeList(data);
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (response.status == 404) {
        navigate("/not-found-page");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
        navigate("/workspace/event");
      }
    } catch (error) {
      console.log(error);
      if (error.name !== "AbortError") {
        alert("Service temporarily unavailable. Please try again later.");
      } else {
        console.log(error);
      }
    }
  }

  async function fetchEventDiscussionBoard(abortSignal: AbortSignal | null) {
    try {
      const queryParams = new URLSearchParams({
        id: eventId || "",
      });

      const response = await fetch(
        `http://localhost:3000/get-event-discussion-board?${queryParams.toString()}`,
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
        setChatLog(data);
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (response.status == 404) {
        navigate("/not-found-page");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
        navigate("/workspace/event");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        alert("Service temporarily unavailable. Please try again later.");
      } else {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      await fetchEventImage(abortController.signal);
      await fetchEventDiscussionBoard(abortController.signal);

      const result = await fetchEventInfo(abortController.signal);
      if (result.isOrganizer) {
        await fetchEventAttendeeList(abortController.signal);
      }

      setEventInfo(result);
    };

    fetchData();

    return () => {
      abortController.abort(); // Clean up the fetch request on component unmount
    };
  }, []);

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
        isOrganizer={eventInfo.isOrganizer}
      />
      {eventInfo.isOrganizer && (
        <AttendeeList
          attendeeList={attendeeList}
          refreshHandler={fetchEventAttendeeList}
          eventID={eventId}
        />
      )}
      <DiscussionBoard
        chatLog={chatLog}
        eventID={eventInfo.eventID}
        refreshHandler={fetchEventDiscussionBoard}
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
  );
}

export default EventDashboardHost;
