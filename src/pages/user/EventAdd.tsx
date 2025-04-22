import { useState, useEffect, useRef } from "react";
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";

import { Button } from "@/components/ui/components/Button";
import Dropdown from "@/components/ui/components/Dropdown";
import DurationInput from "@/components/ui/components/DurationInput";
import { useNavigate } from "react-router-dom";

function EventAdd() {
  const eventVisibilityItems = [
    { text: "Private" }, 
    { text: "Public" }
  ];
  const eventTypeItems = [
    { text: "Conference" },
    { text: "Workshop" },
    { text: "Webinar" },
    { text: "Meetup" },
    { text: "Wedding" },
    { text: "Other" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(eventImagePlaceholder);
  const imageRef = useRef<string>(eventImagePlaceholder);
  const [eventName, setEventName] = useState<string>("");
  const [eventDateTime, setEventDateTime] = useState<string>("");
  const [eventVenue, setEventVenue] = useState<string>("");
  const [eventType, setEventType] = useState<number>(0);
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventVisibility, setEventVisibility] = useState<number>(0);
  const [eventDuration, setEventDuration] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [eventReminder, setEventReminder] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  const navigate = useNavigate();

  // Check outputs
  const [eventNameCheck, setEventNameCheck] = useState<string>("");
  const [eventDateTimeCheck, setEventDateTimeCheck] = useState<string>("");
  const [eventVenueCheck, setEventVenueCheck] = useState<string>("");
  const [eventDescriptionCheck, setEventDescriptionCheck] = useState<string>("");
  const [eventDurationCheck, setEventDurationCheck] = useState<string>("");

  async function handleCreateEvent() {
    setIsLoading(true);
    setEventNameCheck("");
    setEventDateTimeCheck("");
    setEventVenueCheck("");
    setEventDescriptionCheck("");
    setEventDurationCheck("");
    let isValid = true;

    if (!eventName.trim()) {
      setEventNameCheck("*Event name is required.");
      isValid = false;
    }

    if (!eventDateTime || isNaN(new Date(eventDateTime).getTime())) {
      setEventDateTimeCheck("*Please enter a valid date and time.");
      isValid = false;
    }

    const eventDate = new Date(eventDateTime);
    if (eventDate < new Date()) {
      setEventDateTimeCheck("*Event date cannot be in the past.");
      isValid = false;
    }

    if (!eventVenue.trim()) {
      setEventVenueCheck("*Event venue is required.");
      isValid = false;
    }

    if (eventDescription.trim().length < 10) {
      setEventDescriptionCheck("*Please provide a longer event description.");
      isValid = false;
    }

    const durationInSec =
      eventDuration.hour * 3600 +
      eventDuration.minute * 60 +
      eventDuration.second;
    if (durationInSec <= 0) {
      setEventDurationCheck("*Event duration must be greater than zero.");
      isValid = false;
    }

    if (isValid) {
      // Process data to send to the server
      const eventDurationProcessed = `${eventDuration.hour}h ${eventDuration.minute}m ${eventDuration.second}s`;
      const eventReminderProcessed = new Date(eventDate);
      eventReminderProcessed.setHours(
        eventReminderProcessed.getHours() - eventReminder.hour
      );
      eventReminderProcessed.setMinutes(
        eventReminderProcessed.getMinutes() - eventReminder.minute
      );
      eventReminderProcessed.setSeconds(
        eventReminderProcessed.getSeconds() - eventReminder.second
      );

      const getImage = await fetch(image);
      const imageBlob = await getImage.blob();
      const imageArrayBuffer = await imageBlob.arrayBuffer();
      const imageByteArray = new Uint8Array(imageArrayBuffer);
      const imageHexString =
        "\\x" +
        Array.from(imageByteArray)
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");

      let response = await fetch("http://localhost:3000/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          EventName: eventName,
          EventVenue: eventVenue,
          EventDateTime: eventDateTime,
          EventDuration: eventDurationProcessed,
          EventReminderTime: eventReminderProcessed,
          EventVisibility: eventVisibility,
          EventType: eventType,
          Evp: image == eventImagePlaceholder ? "" : imageHexString,
        }),
      });

      if (response.status == 200) {
        alert("Event created successfully.");
        navigate("/workspace/event");
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    }

    setIsLoading(false);
    return;
  }

  function handleSetImage(file: File | undefined) {
    if (file) {
      const validTypes = ["image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a PNG or JPEG image.");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size must be smaller than 5MB.");
        return;
      }

      if (image !== eventImagePlaceholder) {
        URL.revokeObjectURL(imageRef.current);
      }
      const previewURL = URL.createObjectURL(file);
      imageRef.current = previewURL;
      setImage(previewURL);
    }
  }

  useEffect(() => {
    return () => {
      if (imageRef.current !== eventImagePlaceholder) {
        URL.revokeObjectURL(imageRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mt-4 mb-4 text-purple-600">
        Add Event
      </h1>

      <div className="grid grid-cols-2 gap-12">
        <div>
          {/* Event name input */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-light text-base">
              Event Name:
            </label>
            <input
              onChange={(e) => {
                const val = e.target.value;
                setEventName(val);
                if (val.trim()) {
                  setEventNameCheck("");
                }
              }}
              id="name"
              placeholder="Event name..."
              className="border-2 border-gray-300 rounded-md p-2 w-full font-light text-sm"
            />

            {eventNameCheck && <p className="text-red-500 italic">{eventNameCheck}</p>}
          </div>

          {/* Date and Time of the event input */}
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2 font-light text-base">
              Date & Time:
            </label>
            <input
              id="date"
              onChange={(e) => {
                const val = e.target.value;
                setEventDateTime(val);
                const parsedDate = new Date(val);
                if (
                  val &&
                  !isNaN(parsedDate.getTime()) &&
                  parsedDate > new Date()
                ) {
                  setEventDateTimeCheck("");
                }
              }}
              type="datetime-local"
              className="border-2 border-gray-300 rounded-md p-2 w-full font-light text-sm"
            />

            {eventDateTimeCheck && (
              <p className="text-red-500 italic">{eventDateTimeCheck}</p>
            )}
          </div>

          {/* Event venue input */}
          <div className="mb-4">
            <label htmlFor="venue" className="block mb-2 font-light text-base">
              Event Venue:
            </label>
            <input
              onChange={(e) => {
                const val = e.target.value;
                setEventVenue(val);
                if (val.trim()) {
                  setEventVenueCheck("");
                }
              }}
              id="venue"
              placeholder="Event venue..."
              className="border-2 border-gray-300 rounded-md p-2 w-full font-light text-sm"
            />

            {eventVenueCheck && (
              <p className="text-red-500 italic">{eventVenueCheck}</p>
            )}
          </div>

          <label
            htmlFor="visibility"
            className="block mb-2 font-light text-base"
          >
            Event Visibility:
          </label>
          <Dropdown
            placeholder="Event visibility:"
            items={eventVisibilityItems}
            valueSetter={setEventVisibility}
          />
        </div>

        <div>
          {/* Event type input */}
          <div className="mb-4">
            <label className="block mb-2 font-light text-base">
              Event Type:
            </label>
            <Dropdown
              placeholder="Select event type:"
              items={eventTypeItems}
              valueSetter={setEventType}
            />
          </div>

          {/* Event duration input */}
          <div>
            <DurationInput
              label="Event Duration"
              valueSetter={setEventDuration}
            />
          </div>
          {eventDurationCheck && (
            <p className="text-red-500 italic">{eventDurationCheck}</p>
          )}

          {/* Event reminder input */}
          <div>
            <DurationInput
              label="Reminder Setting"
              valueSetter={setEventReminder}
            />
          </div>
        </div>
        <div>
          {/* Event image upload input */}
          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="rounded-md shadow p-2 text-sm font-semibold hover:bg-purple-600 hover:text-white  cursor-pointer"
            >
              Upload image event
            </label>
            <input
              id="avatar"
              onChange={(e) => handleSetImage(e.target.files?.[0])}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="bg-gray-100 w-1/2 h-70 flex justify-center items-center mb-4">
            <img
              src={image}
              alt="Preview Image"
              className="h-full w-full object-cover text-center rounded-md"
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-2 font-light text-base"
        >
          Description:
        </label>
        <textarea
          onChange={(e) => setEventDescription(e.target.value)}
          id="description"
          className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm resize-y min-h-[80px]"
        />
        {eventDescriptionCheck && (
          <p className="text-red-500 italic">{eventDescriptionCheck}</p>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button to="/workspace/event" variant="secondary" className="mr-2 min-w-8"  disabled={isLoading}>        
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleCreateEvent}
          animated={false}
          className="ml-2 bg-purple-500 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 min-w-18"
        >
          {isLoading ? "Loading..." : "Add"}
        </Button>
      </div>
    </div>
  );
}

export default EventAdd;
