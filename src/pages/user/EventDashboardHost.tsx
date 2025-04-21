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
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.png";

function EventDashboardHost() {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "event" | "attendee";
    item: string;
  } | null>(null);

  const { eventId } = useParams();
  const [imageURL, setImageURL] = useState<string>("");
  const imageURLRef = useRef<string>("");
  const [eventInfo, setEventInfo] = useState({
    eventName: "",
    eventID: "",
    eventDateTime: "",
    eventDuration: "",
    eventType: "",
    eventStatus: "",
    eventVisibility: "",
    eventDescription: "",
    eventVenue: ""
  });
  const [isOrganizer, setIsOrganizer] = useState(false);
  const navigate = useNavigate();

  async function fetchEventImage(abortSignal: AbortSignal | null) {
    try {
      const queryParams = new URLSearchParams({
        id: eventId || ""
      });

      const response = await fetch(`http://localhost:3000/get-event-image?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        signal: abortSignal,
      });

      if (response.status == 200) {
        const imageBlob = await response.blob();
        if (imageBlob.size > 0) {
          const imageURL = URL.createObjectURL(imageBlob);
          imageURLRef.current = imageURL;
          setImageURL(imageURL);
        }
        return 1;
      }
      else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return 0;
      }
      else {
        alert("Service temporarily unavailable. Please try again later.");
        return 0;
      }
    } catch (error) {
      alert("Service temporarily unavailable. Please try again later.");
      return 0;
    }
  }

  async function verifyEvent(abortSignal: AbortSignal | null) {
    try {
      const queryParams = new URLSearchParams({
        id: eventId || ""
      });

      const response = await fetch(`http://localhost:3000/verify-event?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        signal: abortSignal,
      });

      if (response.status == 200) {
        return 1;
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return 0;
      } else if (response.status == 404) {
        navigate("/not-found-page");
        return 0;
      } else {
        alert("Service temporarily unavailable. Please try again later.");
        return 0;
      }
    }
    catch {
      alert("Service temporarily unavailable. Please try again later.");
      return 0;
    }
  }

  async function fetchEventInfo(abortSignal: AbortSignal | null) {
    try {

    }
    catch (error) {
      if(error.name != "AbortError") {
        alert("Service temporarily unavailable. Please try again later.");
        return 0;
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    verifyEvent(abortController.signal)
    .then((verificationResult) => {
      if(verificationResult == 1) {

        fetchEventImage(abortController.signal)
        .then((fetchResult) => {
          if(fetchResult == 0) {
            abortController.abort();
          }
        });



      }
    });

    return () => {
      abortController.abort(); // Clean up the fetch request on component unmount
    };
  }, []);
  

  const handleDeleteEvent = (item) => {
    setDeleteTarget({ type: "event", item });
    setDeleteModalOpen(true);
  };
  const handleDeleteAttendee = (item) => {
    setDeleteTarget({ type: "attendee", item });
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    // Handle the delete action here
    if (deleteTarget) {
      if (deleteTarget.type === "event") {
        console.log("Event", deleteTarget.item);
      } else {
        console.log(deleteTarget.item);
      }
    }
    setDeleteModalOpen(false);
  };
  return (
    <div className="p-4 sm:p-6 md:p-4 bg-gray-50">
      <EventInfo imageURL={imageURL} onDelete={handleDeleteEvent} />
      <AttendeeList onDelete={handleDeleteAttendee} />
      <DiscussionBoard />

      {/* Delete modal for event and attendee */}
      {isDeleteModalOpen && deleteTarget && (
        <ConfirmModal
          title={
            deleteTarget.type === "event" ? "Delete Event" : "Delete Attendee"
          }
          message={
            deleteTarget.type === "event"
              ? "Once the event is deleted all info and attendees will be removed."
              : "Are you sure you want to delete this attendee? This action cannot be undone."
          }
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default EventDashboardHost;
