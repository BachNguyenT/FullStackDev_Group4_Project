import { useState, useEffect, useRef } from "react";
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";

import { Button } from "@/components/ui/components/Button";
import Dropdown from "@/components/ui/components/Dropdown";
import DurationInput from "@/components/ui/components/DurationInput";

function EventAdd() {
  const eventVisibilityItems = [{ text: "Private" }, { text: "Public" }];
  const eventTypeItems = [
    { text: "Conference" },
    { text: "Workshop" },
    { text: "Webinar" },
    { text: "Meetup" },
    { text: "Other" },
  ];

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

  // Validation
  const [eventNameCheck, setEventNameCheck] = useState<string>("");
  const [eventDateTimeCheck, setEventDateTimeCheck] = useState<string>("");
  const [eventVenueCheck, setEventVenueCheck] = useState<string>("");
  const [eventDescriptionCheck, setEventDescriptionCheck] =
    useState<string>("");

  function handleCreateEvent() {
    if (!eventName.trim()) {
      setEventNameCheck("Event name is required.");
      return;
    }

    if (!eventDateTime || isNaN(new Date(eventDateTime).getTime())) {
      setEventDateTimeCheck("Please enter a valid date and time.");
      return;
    }

    const eventDate = new Date(eventDateTime);
    if (eventDate < new Date()) {
      setEventDateTimeCheck("Event date cannot be in the past.");
      return;
    }

    if (!eventVenue.trim()) {
      setEventVenueCheck("Event venue is required.");
      return;
    }

    if (eventDescription.trim().length < 10) {
      setEventDescriptionCheck("Please provide a longer event description.");
      return;
    }

    const durationInSec =
      eventDuration.hour * 3600 +
      eventDuration.minute * 60 +
      eventDuration.second;
    if (durationInSec <= 0) {
      alert("Event duration must be greater than zero.");
      return;
    }

    const reminderInSec =
      eventReminder.hour * 3600 +
      eventReminder.minute * 60 +
      eventReminder.second;
    if (reminderInSec <= 0) {
      alert("Reminder time must be greater than zero.");
      return;
    }

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

    // Here you'd proceed to handle the valid event (e.g. save to backend)
    console.log({
      eventName,
      eventDateTime: eventDate.toISOString(),
      eventVenue,
      eventType,
      eventDescription,
      eventVisibility,
      eventDuration: eventDurationProcessed,
      eventReminder: eventReminderProcessed.toISOString(),
      image,
    });

    alert("Event created successfully!");
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div>
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
              className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
            />

            {eventNameCheck && <p className="text-red-500">{eventNameCheck}</p>}
          </div>

          <div>
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
              className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
            />

            {eventDateTimeCheck && (
              <p className="text-red-500">{eventDateTimeCheck}</p>
            )}
          </div>

          <div>
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
              className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
            />

            {eventVenueCheck && (
              <p className="text-red-500">{eventVenueCheck}</p>
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
          <div>
            <label className="block mb-2 font-light text-base">
              Event Type:
            </label>
            <Dropdown
              placeholder="Select event type:"
              items={eventTypeItems}
              valueSetter={setEventType}
            />
          </div>

          <label>Event duration:</label>
          <div>
            <DurationInput valueSetter={setEventDuration} />
          </div>
          <div>
            <DurationInput valueSetter={setEventDuration} />
          </div>

          <label>Reminder setting:</label>
          <div>
            <DurationInput valueSetter={setEventReminder} />
          </div>
          <div>
            <DurationInput valueSetter={setEventReminder} />
          </div>

          {/* Event image upload input */}
          <div>
            <label
              htmlFor="avatar"
              className="rounded-md shadow p-2 text-sm font-semibold hover:bg-purple-600 hover:text-white"
            >
              Upload image event
            </label>
          </div>
          <div>
            {/* Reminder time input */}
            <label
              htmlFor="Reminder"
              className="block mb-2 font-light text-base"
            >
              Reminder:
            </label>
            <input
              onChange={(e) => {
                setDuration(parseInt(e.target.value));
              }}
              id="Reminder"
              placeholder="Second..."
              type="number"
              min={0}
              max={59}
              className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full  font-light text-sm"
            />
            <div>Sec(s)</div>
          </div>
          <div>
            <label
              htmlFor="avatar"
              className="rounded-md shadow p-2 text-sm font-semibold hover:bg-purple-600 hover:text-white"
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
        </div>

        <div>
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

        <div className="bg-gray-100 w-1/3 h-70 flex justify-center items-center">
          <img
            src={image}
            alt="Preview Image"
            className="h-full w-full object-cover text-center rounded-md"
          />
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
          <p className="text-red-500">{eventDescriptionCheck}</p>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button to="/workspace/event" variant="secondary" className="mr-2">
          Cancel
        </Button>
        <Button
          onClick={handleCreateEvent}
          animated={false}
          className="ml-2 bg-purple-500 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default EventAdd;
