// import libraries
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// import components
import { Button } from "../general/Button";

// import icons
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";
import Calender from "@/assets/Icons/calendar.svg";
import User from "@/assets/Icons/user-octagon.svg";
import ID from "@/assets/Icons/card.svg";
import Visibility from "@/assets/Icons/eye2.svg";

function EventCard({
  eventId,
  eventName,
  dateTime,
  eventType,
  visibility,
  attendeeCount,
  maxAttendeeCount,
}: {
  eventId: string;
  eventName: string;
  dateTime: Date;
  eventType: string;
  visibility: string;
  attendeeCount: number;
  maxAttendeeCount: number;
}) {
  const [imageURL, setImageURL] = useState<string>(eventImagePlaceholder);
  const imageURLRef = useRef<string>(eventImagePlaceholder);
  const navigate = useNavigate();

  async function fetchEventImage(abortSignal: AbortSignal) {
    try {
      const queryParams = new URLSearchParams({
        id: eventId || "",
      });

      const response = await fetch(
        `http://localhost:3000/event/image?${queryParams.toString()}`,
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
    const abortController = new AbortController();

    fetchEventImage(abortController.signal);

    return () => {
      if (imageURLRef.current !== eventImagePlaceholder) {
        URL.revokeObjectURL(imageURLRef.current);
      }
      abortController.abort();
    };
  }, []);

  return (
    <div
      className="p-[10px] w-[300px] rounded-md overflow-hidden shadow-lg bg-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => {
        navigate(`/workspace/event/${eventId}`);
      }}
    >
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-md"
          src={imageURL}
          alt="Image"
        />
        <div className="absolute top-0 left-0 bg-white mt-[10px] ml-[10px] flex flex-col items-center rounded-sm font-semibold px-2 py-1">
          <span className="text-gray-800 h-5">{dateTime.getDate()}</span>
          <span className="text-purple-500 text-xs">
            {dateTime.toLocaleString("en-US", { month: "short" }).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="py-[10px]">
        <span className="bg-purple-300 text-xs px-2 py-1 rounded-sm text-gray-800">
          {eventType}
        </span>
        <h2 className="font-semibold text-lg text-gray-800 my-1">
          {eventName}
        </h2>
        <div className="flex flex-col text-sm gap-1">
          <div className="flex flex-row items-center gap-1">
            <img className="h-[18px]" src={ID} />
            <span>{eventId} </span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span className="font-medium flex items-center justify-end">
              <img className="h-[18px]" src={Calender} />
            </span>
            <span>
              {" "}
              {dateTime.toLocaleString("en-UK", {
                hour12: true,
                dateStyle: "long",
                timeStyle: "short",
              })}
            </span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span className="font-medium flex items-center">
              <img className="h-[18px]" src={Visibility} />
            </span>
            <span>{visibility}</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span className="font-medium flex items-center justify-end">
              <img className="h-[18px]" src={User} />
            </span>
            <span>
              {attendeeCount} / {maxAttendeeCount} going
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row text-right gap-2">
        <Button
          className="w-full h-[30px] rounded-sm"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            navigate(`/workspace/event/${eventId}/edit`);
            e.stopPropagation();
          }}
        >
          Edit
        </Button>
        <Button
          to={`/workspace/event/${eventId}`}
          variant="secondary"
          className="w-full h-[30px] rounded-sm"
        >
          View details
        </Button>
      </div>
    </div>
  );
}

export default EventCard;
