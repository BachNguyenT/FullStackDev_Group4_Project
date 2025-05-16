// import libraries
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import components
import { EVENT_TYPE, EVENT_VISIBILITY } from "@/lib/enum";
import { FetchStatus } from "@/enum";
import { Button } from "@/components/general/Button";
import { Dropdown } from "@/components/general";
import { DurationInput } from "@/components/event";
import { fetchEventImage } from "@/api/event-services";
import { TimeDuration, FetchResult } from "@/Types";

// import icons
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";

const EventForm = () => {
  const eventVisibilityItems = [{ text: "Private" }, { text: "Public" }];
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
  const [eventID] = useState<string>(useParams().eventId || "");
  const [eventName, setEventName] = useState<string>("");
  const [eventDateTime, setEventDateTime] = useState<string>("");
  const [eventVenue, setEventVenue] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");

  const [eventType, setEventType] = useState<EVENT_TYPE>(EVENT_TYPE.Conference);
  const [eventVisibility, setEventVisibility] = useState<EVENT_VISIBILITY>(
    EVENT_VISIBILITY.Private
  );

  const [eventDuration, setEventDuration] = useState<TimeDuration>({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [eventReminder, setEventReminder] = useState<TimeDuration>({
    hour: 0,
    minute: 0,
    second: 0,
  });

  const navigate = useNavigate();

  // Check outputs
  const [eventNameCheck, setEventNameCheck] = useState<string>("");
  const [eventDateTimeCheck, setEventDateTimeCheck] = useState<string>("");
  const [eventVenueCheck, setEventVenueCheck] = useState<string>("");
  const [eventDescriptionCheck, setEventDescriptionCheck] =
    useState<string>("");
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

      const response = await fetch("http://localhost:3000/event/create-event", {
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
          EventReminderTime: formatDateToInput(eventReminderProcessed),
          EventVisibility: eventVisibility,
          EventType: eventType,
          Evp: image == eventImagePlaceholder ? "" : imageHexString,
          EventDescription: eventDescription,
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

  async function handleUpdateEvent() {
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
      const reminderDurationInMs =
        (eventReminder.hour * 3600 +
          eventReminder.minute * 60 +
          eventReminder.second) * 1000;
      eventReminderProcessed.setTime(eventReminderProcessed.getTime() - reminderDurationInMs);


      const getImage = await fetch(image);
      const imageBlob = await getImage.blob();
      const imageArrayBuffer = await imageBlob.arrayBuffer();
      const imageByteArray = new Uint8Array(imageArrayBuffer);
      const imageHexString =
        "\\x" +
        Array.from(imageByteArray)
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");

      const queryParams = new URLSearchParams({
        id: eventID || "",
      });

      const response = await fetch(
        `http://localhost:3000/event/info?${queryParams.toString()}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            EventName: eventName,
            EventVenue: eventVenue,
            EventDateTime: eventDateTime,
            EventDuration: eventDurationProcessed,
            EventReminderTime: formatDateToInput(eventReminderProcessed),
            EventVisibility: EVENT_VISIBILITY[eventVisibility],
            EventType: eventType,
            Evp: image == eventImagePlaceholder ? "" : imageHexString,
            EventDescription: eventDescription,
          }),
        }
      );

      if (response.status == 200) {
        alert("Event updated successfully.");
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

  function formatDateToInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  async function handleFetchEvent() {

    setIsLoading(true);
    try {
      if (eventID) {
        const queryParams = new URLSearchParams({
          id: eventID || "",
        });
        const response = await fetch(
          `http://localhost:3000/event/info?${queryParams.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        await loadImage(undefined);

        if (response.status === 200) {
          const data = await response.json();

          setEventName(data.eventName);
          setEventDateTime(formatDateToInput(new Date(data.eventDateTime)));
          setEventVenue(data.eventVenue);
          setEventType(data.eventType);
          setEventDescription(data.eventDescription);
          setEventVisibility(data.eventVisibility);
          const durationParts = data.eventDuration.split(" ");
          const hour = parseInt(durationParts[0].replace("h", "")) || 0;
          const minute = parseInt(durationParts[1].replace("m", "")) || 0;
          const second = parseInt(durationParts[2].replace("s", "")) || 0;
          setEventDuration({
            hour,
            minute,
            second,
          });

          const eventDateTimeObj = new Date(data.eventDateTime);
          const reminderDateTimeObj = new Date(data.eventReminderTime);
          reminderDateTimeObj.setHours(reminderDateTimeObj.getHours() + 7);
          const diffInSeconds = Math.floor(
            (eventDateTimeObj.getTime() - reminderDateTimeObj.getTime()) / 1000
          );

          const hours = Math.floor(diffInSeconds / 3600);
          const minutes = Math.floor((diffInSeconds % 3600) / 60);
          const seconds = diffInSeconds % 60;

          setEventReminder({
            hour: hours,
            minute: minutes,
            second: seconds,
          });


        } else if (response.status === 401) {
          alert("Session expired. Please log in again.");
        } else {
          alert("Service temporarily unavailable. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      alert("Service temporarily unavailable. Please try again later.");
    }
    setIsLoading(false);
  }

  function processFetchFail(fetchResult: FetchResult) {
    if (fetchResult.status === FetchStatus.UNAUTHORIZED) {
      alert("Session expired. Please log in again.");
      navigate("/login");
    } else if (fetchResult.status === FetchStatus.NOT_FOUND) {
      navigate("/not-found-page");
    } else if (fetchResult.status === FetchStatus.ERROR) {
      alert("Service temporarily unavailable. Please try again later.");
      navigate("/workspace/event");
    }
  }

  async function loadImage(abortSignal: AbortSignal | undefined) {
    const eventImage = await fetchEventImage(
      abortSignal,
      eventID);

    if (eventImage.status === FetchStatus.SUCCESS) {
      if (eventImage.result) {
        imageRef.current = eventImage.result;
        setImage(eventImage.result);
      }
      return true;
    }
    else {
      processFetchFail(eventImage);
      return false;
    }
  }


  useEffect(() => {
    handleFetchEvent();
    return () => {
      if (imageRef.current !== eventImagePlaceholder) {
        URL.revokeObjectURL(imageRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mt-4 mb-4 text-purple-600">
        {!eventID ? "Add" : "Edit"} Event
      </h1>

      <div className="grid grid-cols-2 gap-12">
        <div>
          {/* Event name input */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-light text-base">
              Event Name:<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              value={eventName}
              type="text"
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

            {eventNameCheck && (
              <p className="text-red-500 italic">{eventNameCheck}</p>
            )}
          </div>

          {/* Date and Time of the event input */}
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2 font-light text-base">
              Date & Time:<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="date"
              value={eventDateTime}
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
              Event Venue:<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              value={eventVenue}
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
            value={eventVisibility}
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
              value={eventType}
              placeholder="Select event type:"
              items={eventTypeItems}
              valueSetter={setEventType}
            />
          </div>

          {/* Event duration input */}
          <div>
            <DurationInput
              value={eventDuration}
              label="Event Duration:"
              required={true}
              valueSetter={setEventDuration}
            />
          </div>
          {eventDurationCheck && (
            <p className="text-red-500 italic">{eventDurationCheck}</p>
          )}

          {/* Event reminder input */}
          <div>
            <DurationInput
              value={eventReminder}
              label="Reminder Setting:"
              required={false}
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
          value={eventDescription}
          placeholder="Event description"
          onChange={(e) => setEventDescription(e.target.value)}
          id="description"
          className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm resize-y min-h-[80px]"
        />
        {eventDescriptionCheck && (
          <p className="text-red-500 italic">{eventDescriptionCheck}</p>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button
          to="/workspace/event"
          variant="secondary"
          className="mr-2 min-w-8"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={eventID ? handleUpdateEvent : handleCreateEvent}
          animated={false}
          className="ml-2 bg-purple-500 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 min-w-18"
        >
          {isLoading ? "Loading..." : !eventID ? "Add" : "Edit"}
        </Button>
      </div>
    </div>
  );
};

export default EventForm;
