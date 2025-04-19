import { Link } from "react-router-dom";
import { EventInfoProps } from "@/types/Types";
//import components and libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faCalendarAlt,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";
import { useEffect, useRef } from "react";
import { useState } from "react";

function EventCard ({ eventId, eventName, createdOn, visibility, attendeeCount, maxAttendeeCount }: EventInfoProps) {
  const [imageURL, setImageURL] = useState<string>(eventImagePlaceholder);
  const imageURLRef = useRef<string>(eventImagePlaceholder);

  async function fetchEventImage(abortSignal: AbortSignal) {
    try {
      const response = await fetch("http://localhost:3000/get-event-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          key: "5MLGUGJL4GMe86pG4CfrE241BxDYxkeI",
        },
        body: JSON.stringify({
          eventID: eventId
        }),
        credentials: "include",
        signal: abortSignal
      });

      if (response.ok) {
        const imageBlob = await response.blob();
        if(imageBlob.size > 0){
          const imageURL = URL.createObjectURL(imageBlob);
          imageURLRef.current = imageURL;
          setImageURL(imageURL);
        }
      }
    } catch (error) {
      console.error("Error fetching event image:", error);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchEventImage(abortController.signal);

    return () => {
      if(imageURLRef.current !== eventImagePlaceholder) {
        URL.revokeObjectURL(imageURLRef.current);
      }
      abortController.abort();
    };
  }, []);

  return (
    <Link
      to="/workspace/event/${eventId}/dashboard"
      className="w-[300px] rounded-xl overflow-hidden shadow-lg bg-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
    >
      <img
        className="w-full h-48 object-cover"
        src={imageURL}
        alt="Wedding Venue"
      />
      <div className="px-6 py-4">
        <h2 className="font-semibold text-lg text-gray-800 text-center mb-4">
          {eventName}
        </h2>

        <div className="text-sm text-gray-600 space-y-2">
          {/* First Row: Event ID and Created on */}
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col">
              <span className="font-medium flex items-center">
                <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                Event ID:
              </span>
              <span>{eventId}   </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-medium flex items-center justify-end">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Created on:
              </span>
              <span> {createdOn}</span>
            </div>
          </div>

          {/* Second Row: Visibility and No. Attendees */}
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col">
              <span className="font-medium flex items-center">
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Visibility:
              </span>
              <span>{ visibility }</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-medium flex items-center justify-end">
                <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                No. Attendees:
              </span>
              <span>{attendeeCount} out of {maxAttendeeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
