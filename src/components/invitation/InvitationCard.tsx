// import libraries
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import components
import { Button } from "@/components/general/Button";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";
import Host from "@/assets/Icons/user-1.svg";
import Calender from "@/assets/Icons/calendar.svg";
import Visibility from "@/assets/Icons/eye2.svg";
import Duration from "@/assets/Icons/timer.svg";
import Venue from "@/assets/Icons/location.svg";


function InvitationCard({
  organizerName,
  visibility,
  dateTime,
  duration,
  venue,
  eventID,
  eventName,
  eventType,
  rsvpStatus,
}: {
  organizerName: string;
  visibility: string;
  dateTime: Date;
  duration: string;
  venue: string;
  eventID: string;
  eventName: string;
  eventType: string;
  rsvpStatus: string;
}) {
  const [imageURL, setImageURL] = useState(eventImagePlaceholder);
  const imageURLRef = useRef(eventImagePlaceholder);
  const [rsvp, setRsvp] = useState(rsvpStatus);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleAccept() {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      id: eventID || "",
    });

    const response = await fetch(
      `http://localhost:3000/set-rsvp-yes?${queryParams.toString()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      }
    );

    if (response.status === 200) {
      setRsvp("1");
    } else if (response.status === 401) {
      alert("Session expired. Please log in again.");
      navigate("/login");
    } else {
      alert("Service temporarily unavailable. Please try again later.");
    }
    setIsLoading(false);
  }

  async function handleDecline() {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      id: eventID || "",
    });

    const response = await fetch(
      `http://localhost:3000/set-rsvp-no?${queryParams.toString()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      }
    );

    if (response.status === 200) {
      setRsvp("0");
    } else if (response.status === 401) {
      alert("Session expired. Please log in again.");
      navigate("/login");
    } else {
      alert("Service temporarily unavailable. Please try again later.");
    }
    setIsLoading(false);
  }

  async function fetchEventImage(abortSignal: AbortSignal) {
    try {
      const queryParams = new URLSearchParams({
        id: eventID || "",
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

      if (response.ok) {
        const imageBlob = await response.blob();
        if (imageBlob.size > 0) {
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
    setImageURL(eventImagePlaceholder);
    const abortController = new AbortController();

    fetchEventImage(abortController.signal);

    return () => {
      if (imageURLRef.current !== eventImagePlaceholder) {
        URL.revokeObjectURL(imageURLRef.current);
      }
      abortController.abort();
    };
  }, [eventID]);

  return (
    <div className="w-250 md:max-h-[250px] flex flex-col md:flex-row bg-white rounded-md shadow p-3 mb-3 border border-gray-200 gap-x-12">
      {/* Image Box */}
      <div className="relative flex-shrink-0">
        <div className="w-[400px] h-[220px] overflow-hidden rounded-md">
          <img
            className="object-cover h-full w-full rounded-md"
            src={imageURL}
            alt="Image"
          />
        </div>
        <div className="absolute top-0 left-0 bg-white mt-[10px] ml-[10px] flex flex-col items-center rounded-sm font-semibold px-2 py-1">
          <span className="text-gray-800 h-5">{dateTime.getDate()}</span>
          <span className="text-purple-500 text-xs">{dateTime.toLocaleString("en-US", { month: "short" }).toUpperCase()}</span>
        </div>
      </div>
  
      {/* Invitation Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="bg-purple-600 text-xs px-2 py-1 rounded-sm text-white font-bold">
            {eventType}
          </span>
          <h2 className="text-xl font-semibold text-black my-2 truncate">{eventName}</h2> {/* Truncate long eventName */}
          <div className="grid grid-cols-1 md:grid-cols-2 text-sm text-gray-700 gap-y-4 gap-x-20">
            <div className="flex items-start gap-2">
              <img src={Host} className="h-[18px]" />
              <div>
                <p>{organizerName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img src={Visibility} className="h-[18px]" />
              <div>
                <p>{visibility}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img src={Calender} className="h-[18px]" />
              <div>
                <p>{dateTime.toLocaleString("en-UK", { hour12: true, dateStyle: "long", timeStyle: "short" })}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img src={Duration} className="h-[18px]" />
              <div>
                <p>{duration}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img src={Venue} className="h-[18px]" />
              <div>
                <p className="truncate">{venue}</p> {/* Truncate venue if needed */}
              </div>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-between items-center gap-2 mt-4 w-full">
          <Button
            variant="secondary"
            className={`hover:bg-green-500 hover:text-white w-full ${rsvp == "1" ? 'bg-green-500 text-white' : ''}`}
            onClick={handleAccept}
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faCheck} />
            Accept
          </Button>
          <Button
            variant="destructive"
            className={`hover:bg-red-500 hover:text-white w-full ${rsvp == "0" ? 'bg-red-500 text-white' : ''}`}
            onClick={handleDecline}
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faTimes} />
            Decline
          </Button>
          <Button
            to={`/workspace/event/${eventID}`}
            variant="outline"
            animated={false}
            className="hover:bg-purple-500 hover:text-white w-full"
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faEye} />
            More Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InvitationCard;
